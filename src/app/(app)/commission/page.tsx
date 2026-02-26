// ABOUTME: Custom commission page with a two-column product detail layout.
// ABOUTME: Includes a text area for describing the desired painting and add-to-cart.

import { getCommission } from '@/lib/products'
import { CheckIcon } from '@heroicons/react/20/solid'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CommissionForm } from './commission-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Custom Commission',
}

export default async function Commission() {
  const commission = await getCommission()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Commission details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <Link href="/" className="font-medium text-gray-500 hover:text-gray-900">
                    Home
                  </Link>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="ml-2 size-5 shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-500">Custom Commission</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Custom Commission</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Commission information
            </h2>

            {commission && (
              <p className="text-lg text-gray-900 sm:text-xl">{commission.price.formatted}</p>
            )}

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                Want a painting made just for you? Describe a scene &mdash; your favorite animal, a family
                memory, a magical landscape &mdash; and Audrey will paint a one-of-a-kind watercolor just
                for you.
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-900">How it works</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-gray-500">
                <li>Describe your painting idea below</li>
                <li>Add the commission to your cart and check out</li>
                <li>Audrey will paint and ship your custom watercolor</li>
              </ol>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-gray-500">Commissions typically ship within a few days</p>
            </div>
          </section>
        </div>

        {/* Image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <img
            alt="Audrey painting watercolors"
            src="/paintings/artist.jpg"
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>

        {/* Commission form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          {commission && (
            <CommissionForm
              priceId={commission.price.id}
              productId={commission.id}
              name={commission.name}
              price={commission.price.amount}
            />
          )}
        </div>
      </div>
    </div>
  )
}
