import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

const highlights = [
  {
    title: 'Photo Filters',
    description: 'Explore stylized looks with curated presets and quick previews.'
  },
  {
    title: 'AI Models',
    description: 'Compare image and video models with clear capability tags.'
  },
  {
    title: 'Gallery',
    description: 'Collect your latest generations and favorites in one place.'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold">
              RA
            </div>
            <div>
              <p className="text-lg font-semibold">Runspeed AI</p>
              <p className="text-sm text-muted-foreground">Web UI foundation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              View roadmap
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              UI-only scaffold · Next.js 14 + shadcn/ui
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Build the Runspeed AI experience with a flexible, themeable foundation.
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              This starter layout sets up global theming, design tokens, and the base
              navigation shell. Everything is stubbed for UI-only development while
              we map the rest of the experience.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Get started</Button>
              <Button variant="secondary">Preview components</Button>
              <Link
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                href="#highlights"
              >
                View highlights
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Quick stats</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Theme</p>
                  <p className="text-lg font-semibold">System-aware</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Tokens</p>
                  <p className="text-lg font-semibold">CSS variables</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Components</p>
                  <p className="text-lg font-semibold">shadcn/ui ready</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="text-lg font-semibold">Stubbed only</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Explore UI checklist
              </Button>
            </div>
          </div>
        </section>

        <section id="highlights" className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Foundation highlights</h2>
            <Button variant="ghost" size="sm">
              View all modules
            </Button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <Button variant="link" className="mt-4 px-0">
                  View details
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
