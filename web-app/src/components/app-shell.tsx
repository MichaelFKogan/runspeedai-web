import { PropsWithChildren } from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Footer } from '@/components/footer'
import { MobileNav } from '@/components/mobile-nav'
import { Sidebar } from '@/components/sidebar'
import { TopNav } from '@/components/top-nav'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-6 sm:px-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <Breadcrumbs />
            <MobileNav />
          </div>
          <div className="flex gap-8">
            <Sidebar />
            <main className="min-h-[60vh] w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
