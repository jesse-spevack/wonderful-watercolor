// ABOUTME: API route that creates a Stripe Checkout Session.
// ABOUTME: Accepts cart line items and returns the Checkout Session URL.

import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

interface CheckoutItem {
  priceId: string
  quantity: number
}

export async function POST(request: Request) {
  const { items } = (await request.json()) as { items: CheckoutItem[] }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    success_url: `${request.headers.get('origin')}/success`,
    cancel_url: `${request.headers.get('origin')}/cart`,
  })

  return NextResponse.json({ url: session.url })
}
