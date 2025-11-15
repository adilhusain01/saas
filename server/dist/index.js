import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { auth } from './auth';
import { client as dodoClient } from './payments';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/auth', auth.handler);
app.post('/api/payments/create-checkout', async (req, res) => {
    try {
        const { productId, successUrl, cancelUrl } = req.body;
        const session = await dodoClient.checkoutSessions.create({
            product_id: productId,
            success_url: successUrl || 'http://localhost:3000/success',
            cancel_url: cancelUrl || 'http://localhost:3000/cancel',
        });
        res.json({ url: session.url });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/webhooks/dodo', express.raw({ type: 'application/json' }), async (req, res) => {
    // TODO: Verify webhook signature and handle events
    res.json({ received: true });
});
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map