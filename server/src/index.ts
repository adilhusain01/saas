import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import { Webhook } from 'standardwebhooks';
import { client as getDodoClient } from './payments.js';
import { supabase } from './supabase.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy for accurate IP detection behind load balancers/reverse proxies
app.set('trust proxy', true);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://test.dodopayments.com", "https://live.dodopayments.com"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit payment creation to 10 per minute per IP
  message: 'Too many payment requests, please try again later.',
});

app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10kb' })); // Limit payload size

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.post('/api/payments/create-checkout', paymentLimiter, async (req, res) => {
  try {
    // Input validation
    const { productId, successUrl, cancelUrl, timestamp } = req.body;

    // Basic CSRF/timing protection - request should be recent
    if (!timestamp || typeof timestamp !== 'number') {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const requestAge = Date.now() - timestamp;
    if (requestAge > 5 * 60 * 1000) { // 5 minutes
      return res.status(400).json({ error: 'Request expired' });
    }

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Valid productId is required' });
    }

    // Validate productId format and whitelist
    const validProductIds = [
      'pdt_aCU0mubTSuDWGXLcIE9fw', // basic
      'pdt_YQiSHzKDpVGlDUuYaSCR2', // pro
      'pdt_NKyYYMcKtZ8Hpdfmt4fB4'  // max
    ];

    if (!validProductIds.includes(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Validate URLs if provided
    if (successUrl && (typeof successUrl !== 'string' || !successUrl.startsWith('http'))) {
      return res.status(400).json({ error: 'Invalid success URL' });
    }

    if (cancelUrl && (typeof cancelUrl !== 'string' || !cancelUrl.startsWith('http'))) {
      return res.status(400).json({ error: 'Invalid cancel URL' });
    }

    const dodoClient = getDodoClient();
    if (!dodoClient) {
      console.error('Dodo client not configured');
      return res.status(500).json({ error: 'Payment service unavailable' });
    }

    const session = await dodoClient.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1
        }
      ],
      return_url: successUrl || 'http://localhost:3000/success',
    });

    if (!session.checkout_url) {
      throw new Error('Invalid checkout session response');
    }

    res.json({ url: session.checkout_url });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook event handlers
async function handlePaymentCompleted(data: any) {
  try {
    console.log('Processing payment completion:', data);

    // Extract relevant data from Dodo webhook
    const sessionId = data.id;
    const customerEmail = data.customer?.email;
    const amount = data.amount_total; // in cents
    const currency = data.currency || 'usd';

    // Find the product and plan type from the session
    // This is a simplified approach - in production you'd store this mapping
    const productId = data.product_cart?.[0]?.product_id;
    let planType = 'basic'; // default

    if (productId === 'pdt_YQiSHzKDpVGlDUuYaSCR2') planType = 'pro';
    else if (productId === 'pdt_NKyYYMcKtZ8Hpdfmt4fB4') planType = 'max';

    // Find user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (userError || !user) {
      console.error('User not found for email:', customerEmail);
      return;
    }

    // Save purchase to database
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        dodo_session_id: sessionId,
        product_id: productId,
        amount: amount,
        currency: currency,
        status: 'completed',
        plan_type: planType,
        payment_data: data
      });

    if (purchaseError) {
      console.error('Error saving purchase:', purchaseError);
    } else {
      console.log('Purchase saved successfully for user:', user.id);
    }
  } catch (error) {
    console.error('Error handling payment completion:', error);
  }
}

async function handleSubscriptionCreated(data: any) {
  try {
    console.log('Processing subscription creation:', data);

    // Extract subscription data
    const subscriptionId = data.id;
    const customerEmail = data.customer?.email;
    const productId = data.product_cart?.[0]?.product_id;
    const amount = data.amount_total; // in cents
    const currency = data.currency || 'usd';

    // Find user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (userError || !user) {
      console.error('User not found for subscription email:', customerEmail);
      return;
    }

    // Save subscription to purchases table with subscription info
    const { error: subscriptionError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        dodo_session_id: subscriptionId,
        product_id: productId,
        amount: amount,
        currency: currency,
        status: 'active', // subscription status
        plan_type: 'subscription', // or determine from product
        payment_data: data
      });

    if (subscriptionError) {
      console.error('Error saving subscription:', subscriptionError);
    } else {
      console.log('Subscription saved successfully for user:', user.id);
    }
  } catch (error) {
    console.error('Error handling subscription creation:', error);
  }
}

app.post('/api/webhooks/dodo', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Missing webhook secret in environment');
      return res.status(500).json({ error: 'Webhook configuration error' });
    }

    console.log('Received webhook headers:', {
      'webhook-id': req.headers['webhook-id'],
      'webhook-signature': req.headers['webhook-signature'],
      'webhook-timestamp': req.headers['webhook-timestamp'],
      'svix-id': req.headers['svix-id'],
      'svix-signature': req.headers['svix-signature'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'user-agent': req.headers['user-agent']
    });

    const webhook = new Webhook(webhookSecret);
    const headers = {
      'webhook-id': (req.headers['webhook-id'] || req.headers['svix-id']) as string,
      'webhook-signature': (req.headers['webhook-signature'] || req.headers['svix-signature']) as string,
      'webhook-timestamp': (req.headers['webhook-timestamp'] || req.headers['svix-timestamp']) as string,
    };

    const body = req.body.toString();
    console.log('Webhook body length:', body.length);
    console.log('Webhook body preview:', body.substring(0, 200));
    const event = webhook.verify(body, headers) as any;

    // Handle different webhook events
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Payment completed:', event.data);
        await handlePaymentCompleted(event.data);
        break;
      case 'subscription.created':
        console.log('Subscription created:', event.data);
        await handleSubscriptionCreated(event.data);
        break;
      case 'subscription.active':
        console.log('Subscription activated:', event.data);
        // Handle subscription activation
        break;
      case 'subscription.renewed':
        console.log('Subscription renewed:', event.data);
        // Handle subscription renewal
        break;
      case 'subscription.on_hold':
        console.log('Subscription on hold:', event.data);
        // Handle subscription on hold
        break;
      case 'subscription.failed':
        console.log('Subscription failed:', event.data);
        // Handle subscription failure
        break;
      default:
        console.log('Unhandled webhook event:', event.type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Migration function to create purchases table
// async function runMigrations() {
//   try {
//     console.log('Checking for purchases table...');

//     // Try to select from purchases table to see if it exists
//     const { error } = await supabase.from('purchases').select('id').limit(1);

//     if (error && error.code === 'PGRST116') { // Table doesn't exist
//       console.log('Purchases table does not exist. Please run the SQL manually:');
//       console.log('Execute the contents of supabase-setup.sql in your Supabase SQL editor');
//       console.log('Or use: supabase db push (if you have Supabase CLI installed)');
//     } else {
//       console.log('Purchases table exists');
//     }
//   } catch (error) {
//     console.error('Migration check error:', error);
//   }
// }

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // await runMigrations();
});