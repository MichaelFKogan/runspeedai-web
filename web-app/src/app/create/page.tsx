'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { MediaPreview, MediaItem } from '@/components/create/media-preview'
import { UploadDropzone } from '@/components/create/upload-dropzone'
import { Button } from '@/components/ui/button'

const MAX_FILES = 4

const createMediaItem = (file: File): MediaItem => ({
  id: `${file.name}-${file.lastModified}-${Math.random().toString(16).slice(2)}`,
  file,
  url: URL.createObjectURL(file),
  kind: file.type.startsWith('video/') ? 'video' : 'image',
})

export default function CreatePage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const mediaItemsRef = useRef<MediaItem[]>([])

  useEffect(() => {
    mediaItemsRef.current = mediaItems
  }, [mediaItems])

  useEffect(() => {
    return () => {
      mediaItemsRef.current.forEach((item) => URL.revokeObjectURL(item.url))
    }
  }, [])

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

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">Create</p>
        <h1 className="text-3xl font-semibold">New generation</h1>
        <p className="text-sm text-muted-foreground">
          Select a prompt, upload a reference, and kick off a new generation.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="text-base font-semibold text-foreground">Prompt builder</p>
            <p>
              Select a template, refine the prompt, and choose your model settings. This panel
              stays UI-only for now while we focus on upload validation and previews.
            </p>
            <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4">
              Prompt controls will appear here.
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <UploadDropzone onFilesSelected={handleFilesSelected} errors={errors} maxFiles={MAX_FILES} />
          <MediaPreview items={mediaItems} onRemove={handleRemoveItem} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Start generation</Button>
        <Button variant="outline">Save preset</Button>
      </div>
    </div>
  )
}
