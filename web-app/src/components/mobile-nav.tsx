'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { navItems } from '@/components/navigation-data'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-4 rounded bg-foreground" />
          <span className="h-0.5 w-4 rounded bg-foreground" />
          <span className="h-0.5 w-4 rounded bg-foreground" />
        </div>
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-72 border-l border-border bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Navigate</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                ✕
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
