// ABOUTME: Stripe webhook handler for processing checkout events.
// ABOUTME: Verifies webhook signatures and logs checkout.session.completed details.

import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const payload = await request.text()
  const sigHeader = request.headers.get('stripe-signature')

  if (!sigHeader) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  let event

  try {
    event = await getStripe().webhooks.constructEventAsync(
      payload,
      sigHeader,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('checkout.session.completed', {
      sessionId: session.id,
      customerEmail: session.customer_email,
      metadata: session.metadata,
    })
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
