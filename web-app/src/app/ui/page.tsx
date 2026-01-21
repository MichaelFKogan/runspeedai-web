'use client'

import * as React from 'react'
import { Info, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Container } from '@/components/ui/container'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Grid, GridItem } from '@/components/ui/grid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import { Row, RowActions, RowDetails, RowMeta } from '@/components/ui/row'

export default function UiKitPage() {
  const { toast } = useToast()

  return (
    <Container className="space-y-10 py-10">
      <section className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">UI Kit</p>
        <h1 className="text-3xl font-semibold">Reusable components for Runspeed AI</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A catalog of the primitives, overlays, feedback elements, and layout patterns used across the app.
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Primitives</h2>
          <p className="text-sm text-muted-foreground">Buttons, inputs, selects, and toggles.</p>
        </div>
        <Grid>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Primary, secondary, ghost, and outline states.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">Use with icon or text labels.</CardFooter>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>Text input and textarea fields.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="you@runspeed.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea id="prompt" placeholder="Describe the look and feel..." />
                </div>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Selects & Toggles</CardTitle>
                <CardDescription>Model selection and boolean controls.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select defaultValue="sora">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sora">Sora 2</SelectItem>
                      <SelectItem value="veo">Google Veo 3.1 Fast</SelectItem>
                      <SelectItem value="kling">Kling 2.6 Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Include audio</p>
                    <p className="text-xs text-muted-foreground">Generate sound with the video.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="consent" />
                  <Label htmlFor="consent">I accept the usage policy</Label>
                </div>
              </CardContent>
            </Card>
          </GridItem>
        </Grid>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Overlays</h2>
          <p className="text-sm text-muted-foreground">Dialogs, sheets, and tooltips.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm generation</DialogTitle>
                <DialogDescription>
                  This will use 12 credits to generate the preview. You can cancel at any time.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Generate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Generation settings</SheetTitle>
                <SheetDescription>Quick access to duration and resolution controls.</SheetDescription>
              </SheetHeader>
              <div className="space-y-3">
                <Input placeholder="Resolution" />
                <Input placeholder="Duration" />
                <Button>Save settings</Button>
              </div>
            </SheetContent>
          </Sheet>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tooltips help explain parameters.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Feedback</h2>
          <p className="text-sm text-muted-foreground">Progress, skeletons, and toasts.</p>
        </div>
        <Grid className="lg:grid-cols-2">
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Progress & Loading</CardTitle>
                <CardDescription>Display status for long-running tasks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Generating</p>
                  <Progress value={62} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skeleton preview</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Toast notifications</CardTitle>
                <CardDescription>Surface success or errors.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    toast({
                      title: 'Generation started',
                      description: 'We are preparing your image preview.'
                    })
                  }
                >
                  Trigger toast
                </Button>
              </CardContent>
            </Card>
          </GridItem>
        </Grid>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Media surfaces</h2>
          <p className="text-sm text-muted-foreground">Cards, tiles, and rows for gallery items.</p>
        </div>
        <Grid>
          <GridItem>
            <Tile>
              <TileMedia>
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </TileMedia>
              <TileContent>
                <h3 className="text-base font-semibold">Ocean Portrait</h3>
                <p className="text-sm text-muted-foreground">Sora 2 · 12 credits</p>
              </TileContent>
              <TileFooter>
                <span className="text-xs text-muted-foreground">2m ago</span>
                <Button size="sm">View</Button>
              </TileFooter>
            </Tile>
          </GridItem>
          <GridItem>
            <Row>
              <RowMeta>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Sparkles className="h-5 w-5" />
                </div>
                <RowDetails>
                  <p className="text-sm font-medium">City Lights</p>
                  <p className="text-xs text-muted-foreground">Kling 2.6 Pro · 18 credits</p>
                </RowDetails>
              </RowMeta>
              <RowActions>
                <Button size="sm" variant="outline">
                  Details
                </Button>
                <Button size="sm">Open</Button>
              </RowActions>
            </Row>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Insight Card</CardTitle>
                <CardDescription>Highlights usage stats and trends.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold">124</p>
                    <p className="text-xs text-muted-foreground">Total generations</p>
                  </div>
                  <Button size="sm" variant="secondary">
                    View report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </GridItem>
        </Grid>
      </section>
    </Container>
  )
}
