// ABOUTME: API route that creates a Stripe Checkout Session.
// ABOUTME: Accepts cart line items and returns the Checkout Session URL.

import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

interface CheckoutItem {
  priceId: string
  quantity: number
}

export async function POST(request: Request) {
  const { items, description } = (await request.json()) as {
    items: CheckoutItem[]
    description?: string
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 })
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    success_url: `${request.headers.get('origin')}/success`,
    cancel_url: `${request.headers.get('origin')}/cart`,
  }

  if (description) {
    sessionParams.metadata = { commission_description: description }
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  return NextResponse.json({ url: session.url })
}
