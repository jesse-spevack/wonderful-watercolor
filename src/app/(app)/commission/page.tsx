// ABOUTME: Custom commission page explaining the commission offering.
// ABOUTME: Fetches the commission product from Stripe and shows purchase button.

import { Heading } from '@/components/heading'
import { getCommission } from '@/lib/products'
import type { Metadata } from 'next'
import { CommissionPurchaseButton } from './commission-purchase-button'

export const metadata: Metadata = {
  title: 'Custom Commission',
}

export default async function Commission() {
  const commission = await getCommission()

  return (
    <>
      <Heading>Custom Commission</Heading>
      <div className="mt-6 max-w-2xl">
        <p className="text-sm text-zinc-600">
          Want a painting made just for you? Our young artist loves taking on custom projects! Tell us what you would
          like — a favorite animal, a family portrait, a magical landscape — and we will create a one-of-a-kind
          watercolor painting.
        </p>
        <div className="mt-6 rounded-lg border border-zinc-200 p-6">
          <h3 className="text-lg font-semibold text-zinc-900">How it works</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-600">
            <li>Purchase a commission below</li>
            <li>We will reach out to discuss your painting idea</li>
            <li>Your custom watercolor will be painted and shipped to you</li>
          </ol>
        </div>
        {commission && (
          <div className="mt-8">
            <p className="text-2xl font-semibold text-zinc-900">{commission.price.formatted}</p>
            <div className="mt-4">
              <CommissionPurchaseButton
                priceId={commission.price.id}
                productId={commission.id}
                name={commission.name}
                price={commission.price.amount}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
