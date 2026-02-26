// ABOUTME: Product detail page showing a single painting in a two-column layout.
// ABOUTME: Displays large image, breadcrumb, description, price, and add-to-cart button.

import { getProduct } from '@/lib/products'
import { CheckIcon } from '@heroicons/react/20/solid'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import { ImageLightbox } from './image-lightbox'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  return { title: product?.name ?? 'Painting' }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
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
                  <span className="font-medium text-gray-500">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <p className="text-lg text-gray-900 sm:text-xl">{product.price.formatted}</p>

            {product.description && (
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>
            )}

            <div className="mt-6 flex items-center">
              <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-gray-500">Available and ready to ship</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          {product.images[0] ? (
            <ImageLightbox src={product.images[0]} alt={product.name} />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Add to cart */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <AddToCartButton
            priceId={product.price.id}
            productId={product.id}
            name={product.name}
            price={product.price.amount}
          />
        </div>
      </div>
    </div>
  )
}
