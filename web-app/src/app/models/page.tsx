import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid } from '@/components/ui/grid'
import { Row, RowActions, RowDetails, RowMeta } from '@/components/ui/row'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'

const featuredModels = [
  {
    title: 'Runware Studio',
    description: 'High-fidelity portraits with prompt control.',
    type: 'Image'
  },
  {
    title: 'Veo 3.1 Fast',
    description: 'Short-form cinematic video outputs.',
    type: 'Video'
  },
  {
    title: 'Kling 2.6 Pro',
    description: 'Dynamic motion with reference inputs.',
    type: 'Video'
  }
]

const modelRows = [
  {
    title: 'WaveSpeed Ghibli',
    description: 'Stylized anime rendering',
    credits: '4 credits'
  },
  {
    title: 'Seedance 1.0',
    description: 'Fast video generation',
    credits: '12 credits'
  },
  {
    title: 'Fal.ai Motion',
    description: 'Reference motion control',
    credits: '18 credits'
  }
]

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">Models</p>
        <h1 className="text-3xl font-semibold">AI model library</h1>
        <p className="text-sm text-muted-foreground">
          Compare image and video models with capability tags and pricing context.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Featured models</CardTitle>
          <CardDescription>Highlight key image and video engines.</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid className="md:grid-cols-3">
            {featuredModels.map((model) => (
              <Tile key={model.title}>
                <TileMedia className="bg-gradient-to-br from-muted via-muted/50 to-transparent">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {model.type}
                  </span>
                </TileMedia>
                <TileContent>
                  <p className="text-sm font-semibold">{model.title}</p>
                  <p className="text-xs text-muted-foreground">{model.description}</p>
                </TileContent>
                <TileFooter>
                  <Button size="sm" variant="ghost">
                    View details
                  </Button>
                  <span className="text-xs text-muted-foreground">UI-only</span>
                </TileFooter>
              </Tile>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Model lineup</CardTitle>
            <CardDescription>Stubbed comparison rows for pricing context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {modelRows.map((row) => (
              <Row key={row.title}>
                <RowMeta>
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <RowDetails>
                    <p className="text-sm font-semibold">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.description}</p>
                  </RowDetails>
                </RowMeta>
                <RowActions>
                  <span className="text-xs text-muted-foreground">{row.credits}</span>
                  <Button size="sm" variant="outline">
                    Compare
                  </Button>
                </RowActions>
              </Row>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Library actions</CardTitle>
            <CardDescription>Jump into filtered model views.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button>View image models</Button>
            <Button variant="outline">View video models</Button>
            <Button variant="ghost">Compare pricing</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
