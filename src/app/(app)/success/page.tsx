// ABOUTME: Post-checkout confirmation page.
// ABOUTME: Shown after a successful Stripe Checkout payment.

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default function Success() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="text-5xl">🎨</div>
      <Heading className="mt-4">Thank You!</Heading>
      <p className="mt-4 text-sm text-zinc-600">
        Your order has been placed successfully. We are so excited to share these paintings with you!
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        You will receive a confirmation email from Stripe with your order details.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  )
}
