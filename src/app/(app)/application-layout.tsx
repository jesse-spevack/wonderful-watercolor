// ABOUTME: Storefront layout with site-wide navigation and footer.
// ABOUTME: Provides CartProvider context and consistent header/footer across all pages.

'use client'

import { CartProvider, useCart } from '@/lib/cart-context'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function CartLink() {
  const { totalItems } = useCart()
  return (
    <Link href="/cart" className="group -m-2 flex items-center p-2">
      <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
      {totalItems > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalItems}</span>
      )}
      <span className="sr-only">items in cart, view bag</span>
    </Link>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="bg-white">
        <header className="relative bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
                  Wonderful Watercolor
                </Link>
                <div className="flex items-center space-x-8">
                  <Link
                    href="/commission"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Commission
                  </Link>
                  <CartLink />
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer aria-labelledby="footer-heading" className="bg-gray-900">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-12">
              <div className="text-center">
                <h3 className="text-sm font-medium text-white">Wonderful Watercolor</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Original watercolor paintings by Audrey, a young artist in Denver, Colorado.
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                  <Link href="/" className="text-sm text-gray-300 hover:text-white">
                    Shop
                  </Link>
                  <Link href="/commission" className="text-sm text-gray-300 hover:text-white">
                    Commission
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 py-8">
              <p className="text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Wonderful Watercolor. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}
