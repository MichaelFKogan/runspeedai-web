import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid } from '@/components/ui/grid'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'

const mediaItems = [
  {
    title: 'Neon skyline',
    model: 'Runware Studio',
    type: 'Image'
  },
  {
    title: 'Vintage portrait',
    model: 'WaveSpeed',
    type: 'Image'
  },
  {
    title: 'City timelapse',
    model: 'Veo 3.1 Fast',
    type: 'Video'
  },
  {
    title: 'Studio motion',
    model: 'Kling 2.6 Pro',
    type: 'Video'
  },
  {
    title: 'Travel postcard',
    model: 'Runware Studio',
    type: 'Image'
  },
  {
    title: 'Noir street',
    model: 'Fal.ai Motion',
    type: 'Image'
  }
]

const viewerDetails = [
  { label: 'Prompt', value: 'Cinematic neon street, 35mm, rain reflections' },
  { label: 'Aspect ratio', value: '16:9' },
  { label: 'Credits', value: '6 credits' },
  { label: 'Status', value: 'Complete' }
]

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">Gallery</p>
        <h1 className="text-3xl font-semibold">Your generations</h1>
        <p className="text-sm text-muted-foreground">
          Review recent images and videos, filter favorites, and open detail views.
        </p>
      </header>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent media</CardTitle>
            <CardDescription>Stubbed gallery grid with mixed media.</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid className="md:grid-cols-3">
              {mediaItems.map((item) => (
                <Tile key={item.title}>
                  <TileMedia className="bg-gradient-to-br from-muted via-muted/40 to-transparent">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      {item.type}
                    </span>
                  </TileMedia>
                  <TileContent>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.model}</p>
                  </TileContent>
                  <TileFooter>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                    <span className="text-xs text-muted-foreground">UI-only</span>
                  </TileFooter>
                </Tile>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Viewer shell</CardTitle>
            <CardDescription>Lightbox metadata and actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video rounded-xl border border-dashed border-border bg-muted/30" />
            <div className="space-y-2 text-sm">
              {viewerDetails.map((detail) => (
                <div key={detail.label} className="flex items-start justify-between gap-3">
                  <span className="text-xs font-medium uppercase text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Download</Button>
              <Button size="sm" variant="outline">
                Favorite
              </Button>
              <Button size="sm" variant="ghost">
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button>Filter favorites</Button>
        <Button variant="outline">Sort by date</Button>
        <Button variant="ghost">Manage collections</Button>
      </div>
    </div>
  )
}
