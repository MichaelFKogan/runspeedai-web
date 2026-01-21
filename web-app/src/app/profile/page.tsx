import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Grid } from '@/components/ui/grid'
import { Row, RowActions, RowDetails, RowMeta } from '@/components/ui/row'

const statCards = [
  { label: 'Credits', value: '124', detail: 'Available balance' },
  { label: 'Images', value: '48', detail: 'Generated total' },
  { label: 'Videos', value: '12', detail: 'Generated total' },
  { label: 'Favorites', value: '9', detail: 'Saved items' }
]

const settings = [
  {
    title: 'Notification preferences',
    description: 'Manage push and email updates.'
  },
  {
    title: 'Generation defaults',
    description: 'Set aspect ratios and resolution preferences.'
  },
  {
    title: 'Storage cleanup',
    description: 'Review and delete older media.'
  }
]

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title="Account overview"
        description="Track credits, generation stats, and personal settings from one hub."
      />
      <Card>
        <CardHeader>
          <CardTitle>Account stats</CardTitle>
          <CardDescription>Stubbed totals for the profile dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid className="md:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="shadow-none">
                <CardContent className="space-y-2 p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Settings shortcuts</CardTitle>
            <CardDescription>Link out to profile and generation preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {settings.map((item) => (
              <Row key={item.title}>
                <RowMeta>
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <RowDetails>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </RowDetails>
                </RowMeta>
                <RowActions>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </RowActions>
              </Row>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage credits and subscription details.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button>Manage subscription</Button>
            <Button variant="outline">Edit profile</Button>
            <Button variant="ghost">View transactions</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
