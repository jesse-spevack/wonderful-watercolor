// ABOUTME: Homepage displaying hero section, painting grid, and commission CTA.
// ABOUTME: Hero features artist background image; paintings fetched from Stripe.

import { getPaintings } from '@/lib/products'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const paintings = await getPaintings()

  return (
    <>
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="/paintings/artist.jpg"
            className="size-full object-cover object-top"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-48 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Wonderful Watercolor
          </h1>
          <p className="mt-4 text-xl text-white">
            The studio of Audrey, a young artist and student in Denver, Colorado. Browse her collection
            of original paintings or commission a custom watercolor &mdash; describe a scene, and within
            a few days you&apos;ll receive a one-of-a-kind piece. From painting to packing, Audrey
            handles every step herself.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#paintings"
              className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Browse Paintings
            </a>
            <Link
              href="/commission"
              className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
            >
              Commission a Painting
            </Link>
          </div>
        </div>
      </div>

      {/* Painting grid */}
      <section id="paintings" aria-labelledby="paintings-heading" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <h2 id="paintings-heading" className="text-2xl font-bold tracking-tight text-gray-900">
          Shop Paintings
        </h2>
        <p className="mt-4 text-base text-gray-500">
          Each painting is an original watercolor, handmade and unique. Click any painting to see details and add it to your cart.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {paintings.map((painting) => (
            <Link key={painting.id} href={`/shop/${painting.id}`} className="group block">
              {painting.images[0] ? (
                <img
                  alt={painting.name}
                  src={painting.images[0]}
                  className="aspect-3/4 w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
              ) : (
                <div className="flex aspect-3/4 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                  No image
                </div>
              )}
              <h3 className="mt-4 text-base font-semibold text-gray-900">{painting.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{painting.description}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{painting.price.formatted}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Commission CTA */}
      <section
        aria-labelledby="commission-heading"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <img
              alt=""
              src="/paintings/sun-flower.jpg"
              className="size-full object-cover"
            />
          </div>
          <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 id="commission-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Want something custom?
              </h2>
              <p className="mt-3 text-xl text-white">
                Describe a scene &mdash; your favorite animal, a family memory, a magical landscape &mdash;
                and Audrey will paint a one-of-a-kind watercolor just for you.
              </p>
              <Link
                href="/commission"
                className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                Commission a Painting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
