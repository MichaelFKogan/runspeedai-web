import { PropsWithChildren } from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Footer } from '@/components/footer'
import { MobileNav } from '@/components/mobile-nav'
import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Skip to main content
      </a>
      <TopNav />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Breadcrumbs />
            <MobileNav />
          </div>
          <div className="flex gap-8">
            <Sidebar />
            <main
              id="main-content"
              className="min-h-[60vh] w-full rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
            >
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
