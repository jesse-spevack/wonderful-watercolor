// ABOUTME: Client component displaying cart items with quantity controls.
// ABOUTME: Handles checkout by posting to the API route and redirecting to Stripe.

'use client'

import { Button } from '@/components/button'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

export function CartContents() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
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
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500">Your cart is empty.</p>
        <Button href="/shop" className="mt-4">
          Browse Paintings
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="divide-y divide-zinc-200">
        {items.map((item) => (
          <div key={item.priceId} className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-900">{item.name}</h3>
              <p className="text-sm text-zinc-500">${(item.price / 100).toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button plain onClick={() => updateQuantity(item.priceId, item.quantity - 1)}>
                  −
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button plain onClick={() => updateQuantity(item.priceId, item.quantity + 1)}>
                  +
                </Button>
              </div>
              <p className="w-20 text-right text-sm font-medium text-zinc-900">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </p>
              <Button plain onClick={() => removeItem(item.priceId)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-6">
        <p className="text-lg font-semibold text-zinc-900">Total: ${(totalPrice / 100).toFixed(2)}</p>
        <Button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Redirecting…' : 'Checkout'}
        </Button>
      </div>
    </div>
  )
}
