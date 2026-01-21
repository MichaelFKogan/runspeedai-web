import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid } from '@/components/ui/grid'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'

const categories = [
  {
    title: 'Portrait',
    description: 'Studio, cinematic, and editorial headshots.',
    count: '18 presets'
  },
  {
    title: 'Lifestyle',
    description: 'Travel, fitness, and candid looks.',
    count: '12 presets'
  },
  {
    title: 'Illustration',
    description: 'Anime, painterly, and stylized renders.',
    count: '24 presets'
  },
  {
    title: 'Retro',
    description: 'Film grain, VHS, and vintage vibes.',
    count: '9 presets'
  }
]

const spotlight = [
  {
    title: 'Ghibli-inspired',
    subtitle: 'WaveSpeed',
    tags: ['Warm palette', 'Soft detail']
  },
  {
    title: 'Luxury editorial',
    subtitle: 'Runware',
    tags: ['High gloss', 'Fashion']
  },
  {
    title: 'Cinematic noir',
    subtitle: 'Fal.ai',
    tags: ['High contrast', 'Studio light']
  }
]

export default function FiltersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Filters"
        title="Photo filters"
        description="Curate categories, quick previews, and multi-filter selection in this workspace."
      />
      <Card>
        <CardHeader>
          <CardTitle>Filter categories</CardTitle>
          <CardDescription>Stubbed category navigation for the filter library.</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid className="lg:grid-cols-4">
            {categories.map((category) => (
              <Tile key={category.title} className="h-full">
                <TileMedia className="bg-gradient-to-br from-muted/80 via-muted/30 to-transparent">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {category.title}
                  </span>
                </TileMedia>
                <TileContent>
                  <p className="text-sm font-semibold">{category.title}</p>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </TileContent>
                <TileFooter>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TileFooter>
              </Tile>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Spotlight presets</CardTitle>
            <CardDescription>Trending looks with quick preview metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {spotlight.map((item) => (
              <div key={item.title} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Launch common filter workflows.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button>Browse categories</Button>
            <Button variant="outline">Upload reference</Button>
            <Button variant="ghost">Compare filters</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
