// ABOUTME: Shop page displaying all available paintings.
// ABOUTME: Responsive grid with images, titles, and prices linking to detail pages.

import { Heading } from '@/components/heading'
import { Link } from '@/components/link'
import { getPaintings } from '@/lib/products'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop',
}

export default async function Shop() {
  const paintings = await getPaintings()

  return (
    <>
      <Heading>Shop Paintings</Heading>
      <p className="mt-2 text-sm text-zinc-600">
        Browse our collection of original watercolor paintings. Each one is handmade and unique.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paintings.map((painting) => (
          <Link key={painting.id} href={`/shop/${painting.id}`} className="group block">
            <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
              {painting.images[0] ? (
                <img
                  src={painting.images[0]}
                  alt={painting.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-400">No image</div>
              )}
            </div>
            <h3 className="mt-3 text-sm font-medium text-zinc-900">{painting.name}</h3>
            <p className="mt-1 text-sm text-zinc-600">{painting.price.formatted}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
