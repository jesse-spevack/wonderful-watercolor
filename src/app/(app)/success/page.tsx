// ABOUTME: Post-checkout confirmation page.
// ABOUTME: Shown after a successful Stripe Checkout payment.

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default function Success() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your order is on its way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order has been placed successfully. You will receive a confirmation email from
            Stripe with your order details.
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-500">
            <li>Audrey will begin preparing your order</li>
            <li>Your paintings will be carefully packed and shipped</li>
            <li>You&apos;ll receive a beautiful, original watercolor at your door</li>
          </ol>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
