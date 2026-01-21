'use client'

import { ImageIcon, Trash2, VideoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'

export type MediaItem = {
  id: string
  file: File
  url: string
  kind: 'image' | 'video'
}

type MediaPreviewProps = {
  items: MediaItem[]
  onRemove: (id: string) => void
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function MediaPreview({ items, onRemove }: MediaPreviewProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No media selected"
        description="Upload an image or video to see previews."
        icon={<ImageIcon className="h-5 w-5 text-muted-foreground" />}
      />
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 ease-out hover:shadow-lg"
        >
          <div className="relative aspect-video overflow-hidden bg-muted">
            {item.kind === 'image' ? (
              <img
                src={item.url}
                alt={item.file.name}
                className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <video src={item.url} className="h-full w-full object-cover" controls />
            )}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
              {item.kind === 'image' ? (
                <ImageIcon className="h-3.5 w-3.5" />
              ) : (
                <VideoIcon className="h-3.5 w-3.5" />
              )}
              {item.kind}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="space-y-1">
              <p className="max-w-[220px] truncate text-sm font-medium text-foreground">
                {item.file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(item.file.size)} · {item.file.type || 'Unknown type'}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
