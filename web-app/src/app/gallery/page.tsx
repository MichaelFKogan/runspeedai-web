import { Button } from '@/components/ui/button'

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
      <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Media grid placeholder
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Filter favorites</Button>
        <Button variant="outline">Sort by date</Button>
      </div>
    </div>
  )
}
