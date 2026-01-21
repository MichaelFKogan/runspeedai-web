import { Button } from '@/components/ui/button'

export default function CreatePage() {
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
        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Prompt builder placeholder
        </div>
        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Upload & preview placeholder
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Start generation</Button>
        <Button variant="outline">Save preset</Button>
      </div>
    </div>
  )
}
