// ABOUTME: Client component displaying cart items with remove buttons and checkout.
// ABOUTME: Handles checkout by posting to the API route and redirecting to Stripe.

'use client'

import { useCart } from '@/lib/cart-context'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useState } from 'react'

export function CartContents() {
  const { items, removeItem, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            priceId: item.priceId,
            quantity: item.quantity,
          })),
        }),
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">Your cart is empty.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form className="mt-12" onSubmit={(e) => { e.preventDefault(); handleCheckout() }}>
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {items.map((item) => (
            <li key={item.priceId} className="flex py-6">
              <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div className="flex justify-between">
                    <h4 className="text-sm">
                      <span className="font-medium text-gray-700">
                        {item.name}
                      </span>
                    </h4>
                    <p className="ml-4 text-sm font-medium text-gray-900">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    ${(item.price / 100).toFixed(2)} each &middot; Qty {item.quantity}
                  </p>
                </div>

                <div className="mt-4 flex flex-1 items-end justify-between">
                  <p className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
                    <span>In stock</span>
                  </p>
                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={() => removeItem(item.priceId)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Order summary */}
      <section aria-labelledby="summary-heading" className="mt-10">
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <div>
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-base font-medium text-gray-900">Subtotal</dt>
              <dd className="ml-4 text-base font-medium text-gray-900">
                ${(totalPrice / 100).toFixed(2)}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden disabled:opacity-50"
          >
            {loading ? 'Redirecting...' : 'Checkout'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </section>
    </form>
  )
}
