import { Button } from '@/components/ui/button'

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
      <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Model cards and configuration details will live here.
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>View image models</Button>
        <Button variant="outline">View video models</Button>
      </div>
    </div>
  )
}
