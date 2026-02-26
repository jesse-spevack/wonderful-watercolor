// ABOUTME: Storefront layout with top navigation bar.
// ABOUTME: Uses Catalyst StackedLayout for a clean e-commerce feel.

'use client'

import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { StackedLayout } from '@/components/stacked-layout'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { HomeIcon, ShoppingBagIcon, PaintBrushIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  return (
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
            <NavbarItem href="/cart" current={pathname === '/cart'}>
              Cart
            </NavbarItem>
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
              <SidebarItem href="/cart" current={pathname === '/cart'}>
                <ShoppingCartIcon />
                <SidebarLabel>Cart</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  )
}
