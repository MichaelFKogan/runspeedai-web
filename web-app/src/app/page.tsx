import Link from 'next/link'

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
    <div className="space-y-10">
      <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              UI-only scaffold · Next.js 14 + shadcn/ui
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Build the Runspeed AI experience with a consistent navigation shell.
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              All routes share the global AppShell, with responsive navigation, breadcrumbs,
              and placeholder spaces for future modules.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Start creating</Button>
            <Button variant="secondary">Explore models</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Use the navigation to move between core areas. Each view is stubbed for
            UI-only development until the full feature set is implemented.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm">
              View roadmap
            </Button>
            <Link
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              href="/models"
            >
              Browse models
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Quick stats</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Shell</p>
              <p className="text-lg font-semibold">Unified</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Navigation</p>
              <p className="text-lg font-semibold">Responsive</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Routes</p>
              <p className="text-lg font-semibold">6 stubbed</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-lg font-semibold">UI-only</p>
            </div>
          </div>
        </div>
      </section>

      <section>
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
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
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
    </div>
  )
}
