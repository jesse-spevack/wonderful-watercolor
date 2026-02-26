// ABOUTME: Root layout for the app route group.
// ABOUTME: Wraps all pages in the storefront layout.

import { ApplicationLayout } from './application-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ApplicationLayout>{children}</ApplicationLayout>
}
