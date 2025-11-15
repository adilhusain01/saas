import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js'

console.log("Loaded environment variables:");
console.log({
  PORT: process.env.PORT ? "***LOADED***" : "MISSING",
  NODE_ENV: process.env.NODE_ENV ? "***LOADED***" : "MISSING",
  SUPABASE_URL: process.env.SUPABASE_URL ? "***LOADED***" : "MISSING",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "***LOADED***" : "MISSING",
  DODO_PAYMENTS_API_KEY: process.env.DODO_PAYMENTS_API_KEY ? "***LOADED***" : "MISSING",
  DATABASE_URL:process.env.DATABASE_URL ? "***LOADED***" : "MISSING",
  NEXT_AUTH_SECRET: process.env.NEXTAUTH_SECRET ? "***LOADED***" : "MISSING",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "***LOADED***" : "MISSING",
  DODO_WEBHOOK_SECRET: process.env.DODO_WEBHOOK_SECRET ? "***LOADED***" : "MISSING",
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY ? "***LOADED***" : "MISSING",
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN ? "***LOADED***" : "MISSING",
});


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)