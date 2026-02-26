// ABOUTME: Product detail page showing a single painting.
// ABOUTME: Displays large image, description, price, and add-to-cart button.

import { Heading } from '@/components/heading'
import { Link } from '@/components/link'
import { getProduct } from '@/lib/products'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'

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
    <>
      <div className="max-lg:hidden">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500">
          <ChevronLeftIcon className="size-4 fill-zinc-400" />
          Back to Shop
        </Link>
      </div>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">No image</div>
          )}
        </div>

        {/* Details */}
        <div>
          <Heading>{product.name}</Heading>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">{product.price.formatted}</p>
          <p className="mt-4 text-sm text-zinc-600">{product.description}</p>
          <div className="mt-8">
            <AddToCartButton
              priceId={product.price.id}
              productId={product.id}
              name={product.name}
              price={product.price.amount}
            />
          </div>
        </div>
      </div>
    </>
  )
}
