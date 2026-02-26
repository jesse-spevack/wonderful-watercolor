// ABOUTME: Client component wrapping the commission description textarea and purchase button.
// ABOUTME: Manages textarea state so the description can be passed through to checkout.

'use client'

import { useState } from 'react'
import { CommissionPurchaseButton } from './commission-purchase-button'

export function CommissionForm({
  priceId,
  productId,
  name,
  price,
}: {
  priceId: string
  productId: string
  name: string
  price: number
}) {
  const [description, setDescription] = useState('')

  return (
    <>
      <div className="mb-6">
        <label htmlFor="commission-description" className="block text-sm font-medium text-gray-700">
          Describe your painting
        </label>
        <textarea
          id="commission-description"
          name="description"
          rows={4}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A sunset over the Rocky Mountains with a family of deer in the foreground..."
          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-hidden"
        />
        <p className="mt-2 text-sm text-gray-500">
          Be as descriptive as you like. Audrey will reach out if she has questions.
        </p>
      </div>

      <CommissionPurchaseButton
        priceId={priceId}
        productId={productId}
        name={name}
        price={price}
        description={description || undefined}
      />
    </>
  )
}
