import { Button } from '@/components/ui/button'

export default function FiltersPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">Filters</p>
        <h1 className="text-3xl font-semibold">Photo filters</h1>
        <p className="text-sm text-muted-foreground">
          Curate categories, quick previews, and multi-filter selection in this
          workspace.
        </p>
      </header>
      <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Filter collections will appear here once the UI modules are connected.
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Browse categories</Button>
        <Button variant="outline">Upload reference</Button>
      </div>
    </div>
  )
}
