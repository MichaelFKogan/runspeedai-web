import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">Profile</p>
        <h1 className="text-3xl font-semibold">Account overview</h1>
        <p className="text-sm text-muted-foreground">
          Track credits, generation stats, and personal settings from one hub.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Credit balance placeholder
        </div>
        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Stats & settings placeholder
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Manage subscription</Button>
        <Button variant="outline">Edit profile</Button>
      </div>
    </div>
  )
}
