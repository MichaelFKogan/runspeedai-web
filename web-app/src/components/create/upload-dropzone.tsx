'use client'

import { useRef, useState } from 'react'
import { CloudUpload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type UploadDropzoneProps = {
  onFilesSelected: (files: File[]) => void
  errors?: string[]
  maxFiles?: number
}

export function UploadDropzone({ onFilesSelected, errors, maxFiles = 4 }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    onFilesSelected(Array.from(fileList))
  }

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center text-sm text-muted-foreground transition-all duration-300 ease-out hover:border-primary/40 hover:bg-muted/50 hover:shadow-sm',
          isDragging && 'border-primary/60 bg-muted/60 text-foreground shadow-sm'
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragging(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept="image/*,video/*"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm transition duration-300 ease-out group-hover:scale-105">
            <CloudUpload className="h-5 w-5 text-primary" />
          </span>
          <div className="space-y-1">
            <p className="text-base font-medium text-foreground">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">
              or select up to {maxFiles} images or videos to preview
            </p>
          </div>
          <Button type="button" variant="outline" size="sm">
            Browse files
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Accepted formats: JPG, PNG, WebP, GIF, MP4, MOV, WebM. Max {maxFiles} files.
      </p>
      {errors && errors.length > 0 ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-semibold">Upload issues</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
