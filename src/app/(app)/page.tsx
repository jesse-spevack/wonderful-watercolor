// ABOUTME: Wonderful Watercolor homepage with hero banner and painting grid.
// ABOUTME: Fetches paintings from Stripe and displays in a responsive grid.

import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { getPaintings } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const paintings = await getPaintings()

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-amber-50 p-8 sm:p-12">
        <div className="max-w-xl">
          <Heading>Wonderful Watercolor</Heading>
          <p className="mt-4 text-lg text-zinc-600">
            Handmade watercolor paintings by a young artist. Each piece is an original, painted with love and
            imagination.
          </p>
          <div className="mt-6 flex gap-4">
            <Button href="/shop">Shop Paintings</Button>
            <Button href="/commission" outline>
              Custom Commission
            </Button>
          </div>
        </div>
      </div>

      {/* Paintings grid */}
      <Subheading className="mt-12">Featured Paintings</Subheading>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
