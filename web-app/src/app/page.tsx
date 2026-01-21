import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Grid } from '@/components/ui/grid'
import { Row } from '@/components/ui/row'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'

const highlights = [
  {
    title: 'Photo Filters',
    description: 'Explore stylized looks with curated presets and quick previews.',
    cta: 'Browse filters'
  },
  {
    title: 'AI Models',
    description: 'Compare image and video models with clear capability tags.',
    cta: 'View models'
  },
  {
    title: 'Gallery',
    description: 'Collect your latest generations and favorites in one place.',
    cta: 'Open gallery'
  }
]

const activity = [
  {
    title: 'Latest upload',
    description: '2 images · 1 video queued',
    time: 'Just now'
  },
  {
    title: 'Credits updated',
    description: 'Starter pack added',
    time: '2 hours ago'
  },
  {
    title: 'Favorite saved',
    description: 'Portrait study · VEO 3.1',
    time: 'Yesterday'
  }
]

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section>
        <Card>
          <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Use the navigation to move between core areas. Each view is stubbed for UI-only
              development until the full feature set is implemented.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm">
              View roadmap
            </Button>
            <Link
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              href="/models"
            >
              Browse models
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick stats</CardTitle>
            <CardDescription>Snapshot of the UI-only build progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid className="sm:grid-cols-2">
              {[
                { label: 'Shell', value: 'Unified' },
                { label: 'Navigation', value: 'Responsive' },
                { label: 'Routes', value: '6 stubbed' },
                { label: 'Status', value: 'UI-only' }
              ].map((stat) => (
                <Card key={stat.label} className="shadow-none">
                  <CardContent className="space-y-2 p-4">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Foundation highlights</h2>
          <Button variant="ghost" size="sm">
            View all modules
          </Button>
        </div>
        <Grid className="mt-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Tile key={item.title}>
              <TileMedia className="bg-gradient-to-br from-muted via-muted/40 to-transparent">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.title}
                </span>
              </TileMedia>
              <TileContent>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </TileContent>
              <TileFooter>
                <Button variant="ghost" size="sm">
                  {item.cta}
                </Button>
                <span className="text-xs text-muted-foreground">UI-only</span>
              </TileFooter>
            </Tile>
          ))}
        </Grid>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>Quick links to main workflows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Row>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Create a generation</p>
                <p className="text-xs text-muted-foreground">
                  Upload or prompt, then choose your model.
                </p>
              </div>
              <Button size="sm">Open Create</Button>
            </Row>
            <Row>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Explore filters</p>
                <p className="text-xs text-muted-foreground">
                  Compare filter categories and presets.
                </p>
              </div>
              <Button size="sm" variant="outline">
                View Filters
              </Button>
            </Row>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Stubbed activity stream for the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
