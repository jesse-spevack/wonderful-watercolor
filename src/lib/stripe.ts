// ABOUTME: Stripe client singleton for server-side API calls.
// ABOUTME: Initialized lazily to avoid build-time evaluation when env vars aren't available.

import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  }
  return _stripe
}
