'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MediaPreview, MediaItem } from '@/components/create/media-preview'
import { UploadDropzone } from '@/components/create/upload-dropzone'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tile, TileContent, TileFooter, TileMedia } from '@/components/ui/tile'

const MAX_FILES = 4

type GenerationStatus = 'idle' | 'queued' | 'running' | 'success' | 'failed'

type StatusStep = {
  label: string
  description: string
  status: GenerationStatus
}

const STATUS_STEPS: StatusStep[] = [
  { label: 'Queued', description: 'Job accepted and waiting for compute.', status: 'queued' },
  { label: 'Running', description: 'Generating and refining outputs.', status: 'running' },
  { label: 'Success', description: 'Assets are ready to review.', status: 'success' },
  { label: 'Failure', description: 'Something went wrong. Try again.', status: 'failed' },
]

const createMediaItem = (file: File): MediaItem => ({
  id: `${file.name}-${file.lastModified}-${Math.random().toString(16).slice(2)}`,
  file,
  url: URL.createObjectURL(file),
  kind: file.type.startsWith('video/') ? 'video' : 'image',
})

const mockResults = [
  {
    id: 'result-1',
    title: 'City sprint portrait',
    description: 'Midday lighting, warm highlights.',
    tone: 'from-violet-500/20 via-slate-900 to-slate-950',
  },
  {
    id: 'result-2',
    title: 'Studio depth pass',
    description: 'Sharp focus with soft gradients.',
    tone: 'from-cyan-500/20 via-slate-900 to-slate-950',
  },
  {
    id: 'result-3',
    title: 'Dynamic motion blur',
    description: 'Runner silhouette, neon accents.',
    tone: 'from-amber-500/20 via-slate-900 to-slate-950',
  },
]

export default function CreatePage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle')
  const [progressValue, setProgressValue] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Ready to start a new generation.')
  const [simulateFailure, setSimulateFailure] = useState(false)
  const mediaItemsRef = useRef<MediaItem[]>([])
  const timeoutRefs = useRef<number[]>([])

  useEffect(() => {
    mediaItemsRef.current = mediaItems
  }, [mediaItems])

  useEffect(() => {
    return () => {
      mediaItemsRef.current.forEach((item) => URL.revokeObjectURL(item.url))
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  const isBusy = generationStatus === 'queued' || generationStatus === 'running'
  const statusLabel = useMemo(() => {
    switch (generationStatus) {
      case 'queued':
        return 'Queued'
      case 'running':
        return 'Running'
      case 'success':
        return 'Success'
      case 'failed':
        return 'Failure'
      default:
        return 'Idle'
    }
  }, [generationStatus])

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      const nextErrors: string[] = []
      const validItems: MediaItem[] = []
      const remainingSlots = MAX_FILES - mediaItems.length

      if (remainingSlots <= 0) {
        setErrors([`You can upload up to ${MAX_FILES} files. Remove one to add more.`])
        return
      }

      files.forEach((file) => {
        const isImage = file.type.startsWith('image/')
        const isVideo = file.type.startsWith('video/')

        if (!isImage && !isVideo) {
          nextErrors.push(`"${file.name}" is not a supported file type.`)
          return
        }

        if (validItems.length < remainingSlots) {
          validItems.push(createMediaItem(file))
        }
      })

      if (files.length > remainingSlots) {
        nextErrors.push(`Only ${remainingSlots} more file(s) can be added right now.`)
      }

      if (validItems.length === 0 && nextErrors.length === 0) {
        nextErrors.push('No supported files selected.')
      }

      setMediaItems((prev) => [...prev, ...validItems])
      setErrors(nextErrors)
    },
    [mediaItems.length]
  )

  const handleRemoveItem = useCallback((id: string) => {
    setMediaItems((prev) => {
      const item = prev.find((entry) => entry.id === id)
      if (item) {
        URL.revokeObjectURL(item.url)
      }
      return prev.filter((entry) => entry.id !== id)
    })
  }, [])

  const handleStartGeneration = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutRefs.current = []

    setGenerationStatus('queued')
    setProgressValue(18)
    setStatusMessage('Queued. Preparing your job configuration.')

    const queuedTimeout = window.setTimeout(() => {
      setGenerationStatus('running')
      setProgressValue(52)
      setStatusMessage('Running. Generating variations and prompt alignment.')
    }, 900)

    const midTimeout = window.setTimeout(() => {
      setProgressValue(78)
      setStatusMessage('Running. Upscaling, color grading, and sharpening output.')
    }, 2200)

    const finalTimeout = window.setTimeout(() => {
      if (simulateFailure) {
        setGenerationStatus('failed')
        setProgressValue(100)
        setStatusMessage('Failure. The mock model returned an error. Try again.')
      } else {
        setGenerationStatus('success')
        setProgressValue(100)
        setStatusMessage('Success. Results are ready to review and download.')
      }
    }, 3400)

    timeoutRefs.current.push(queuedTimeout, midTimeout, finalTimeout)
  }, [simulateFailure])

  const handleReset = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutRefs.current = []
    setGenerationStatus('idle')
    setProgressValue(0)
    setStatusMessage('Ready to start a new generation.')
  }, [])

  const resultHeadline = generationStatus === 'failed' ? 'Generation failed' : 'Generation results'
  const resultDescription =
    generationStatus === 'failed'
      ? 'The mock job failed. Adjust your inputs and retry to preview a success flow.'
      : 'Browse the latest outputs from the mock generation run.'

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Create"
        title="New generation"
        description="Select a prompt, upload a reference, and kick off a new generation."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Generation form</CardTitle>
            <CardDescription>
              Draft the prompt, select a model, and configure generation options. All inputs are
              UI-only with mock state transitions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Describe the athlete, lighting, and style..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Model</Label>
                <Select defaultValue="runspeed-core">
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="runspeed-core">Runspeed Core</SelectItem>
                    <SelectItem value="studio-depth">Studio Depth</SelectItem>
                    <SelectItem value="action-blur">Action Blur XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Aspect ratio</Label>
                <Select defaultValue="4-5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-1">1:1 Square</SelectItem>
                    <SelectItem value="4-5">4:5 Portrait</SelectItem>
                    <SelectItem value="16-9">16:9 Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="seed">Seed</Label>
                <Input id="seed" placeholder="Auto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outputs">Outputs</Label>
                <Input id="outputs" placeholder="4" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Mock failure mode</p>
                <p className="text-xs text-muted-foreground">Toggle to preview the failure state.</p>
              </div>
              <Switch checked={simulateFailure} onCheckedChange={setSimulateFailure} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload assets</CardTitle>
            <CardDescription>Drag-and-drop reference images or video.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UploadDropzone onFilesSelected={handleFilesSelected} errors={errors} maxFiles={MAX_FILES} />
            <MediaPreview items={mediaItems} onRemove={handleRemoveItem} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center justify-between gap-2">
              <span>Generation status</span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {statusLabel}
              </span>
            </CardTitle>
            <CardDescription>{statusMessage}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressValue} />
            <div className="grid gap-3 sm:grid-cols-2">
              {STATUS_STEPS.map((step) => {
                const isActive = generationStatus === step.status
                const isCompleted =
                  generationStatus === 'success'
                    ? step.status !== 'failed'
                    : generationStatus === 'failed'
                      ? step.status !== 'success'
                      : generationStatus === 'running'
                        ? step.status === 'queued'
                        : generationStatus === 'queued'
                          ? step.status === 'queued'
                          : false

                return (
                  <div
                    key={step.label}
                    className={`rounded-xl border px-4 py-3 text-sm transition ${
                      isActive
                        ? 'border-primary/50 bg-primary/5 text-foreground'
                        : isCompleted
                          ? 'border-border bg-muted/40 text-muted-foreground'
                          : 'border-border text-muted-foreground'
                    }`}
                  >
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStartGeneration} disabled={isBusy}>
                {generationStatus === 'idle' ? 'Start generation' : 'Run again'}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isBusy && generationStatus === 'running'}>
                Reset
              </Button>
              <Button variant="ghost" disabled>
                Save preset
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Queue details</CardTitle>
            <CardDescription>Mock metadata for a believable async run.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-muted-foreground">Job ID</span>
              <span className="font-mono text-xs">job_8340_9d3a</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-muted-foreground">Estimated time</span>
              <span>~12 seconds</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-muted-foreground">Credit cost</span>
              <span>4.0 credits</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
              <span className="text-muted-foreground">Webhook</span>
              <span className="font-mono text-xs">/api/webhooks/mock</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{resultHeadline}</CardTitle>
          <CardDescription>{resultDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {generationStatus === 'failed' ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
              The mock model returned an error. Try toggling off failure mode and rerun to view
              success results.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {mockResults.map((result) => (
                <Tile key={result.id}>
                  <TileMedia className={`bg-gradient-to-br ${result.tone}`}>
                    <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold">
                      Ready
                    </span>
                  </TileMedia>
                  <TileContent>
                    <p className="font-semibold">{result.title}</p>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </TileContent>
                  <TileFooter>
                    <span className="text-xs text-muted-foreground">1024 × 1280</span>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </TileFooter>
                </Tile>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
