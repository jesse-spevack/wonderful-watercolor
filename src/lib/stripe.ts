// ABOUTME: Stripe client singleton for server-side API calls.
// ABOUTME: Configured with the secret key from environment variables.

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
