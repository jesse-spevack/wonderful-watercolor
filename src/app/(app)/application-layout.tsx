// ABOUTME: Storefront layout with top navigation bar.
// ABOUTME: Uses Catalyst StackedLayout for a clean e-commerce feel.

'use client'

import { Badge } from '@/components/badge'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { StackedLayout } from '@/components/stacked-layout'
import { CartProvider, useCart } from '@/lib/cart-context'
import { HomeIcon, PaintBrushIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

function CartNavItem({ current }: { current: boolean }) {
  const { totalItems } = useCart()
  return (
    <NavbarItem href="/cart" current={current}>
      Cart
      {totalItems > 0 && <Badge color="amber">{totalItems}</Badge>}
    </NavbarItem>
  )
}

function CartSidebarItem({ current }: { current: boolean }) {
  const { totalItems } = useCart()
  return (
    <SidebarItem href="/cart" current={current}>
      <ShoppingCartIcon />
      <SidebarLabel>Cart</SidebarLabel>
      {totalItems > 0 && <Badge color="amber">{totalItems}</Badge>}
    </SidebarItem>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  return (
    <CartProvider>
      <StackedLayout
        navbar={
          <Navbar>
            <NavbarItem href="/" current={pathname === '/'}>
              Wonderful Watercolor
            </NavbarItem>
            <NavbarSpacer />
            <NavbarSection>
              <NavbarItem href="/shop" current={pathname.startsWith('/shop')}>
                Shop
              </NavbarItem>
              <NavbarItem href="/commission" current={pathname === '/commission'}>
                Commission
              </NavbarItem>
              <CartNavItem current={pathname === '/cart'} />
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/" current={pathname === '/'}>
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/shop" current={pathname.startsWith('/shop')}>
                  <ShoppingBagIcon />
                  <SidebarLabel>Shop</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/commission" current={pathname === '/commission'}>
                  <PaintBrushIcon />
                  <SidebarLabel>Commission</SidebarLabel>
                </SidebarItem>
                <CartSidebarItem current={pathname === '/cart'} />
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
      >
        {children}
      </StackedLayout>
    </CartProvider>
  )
}
