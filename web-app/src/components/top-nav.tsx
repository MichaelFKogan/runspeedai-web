import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { navItems } from '@/components/navigation-data'

export function TopNav() {
  return (
    <div className="border-b border-border bg-background/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
            RA
          </div>
          <div>
            <p className="text-base font-semibold">Runspeed AI</p>
            <p className="text-xs text-muted-foreground">Web UI</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="sm">
            Buy credits
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
