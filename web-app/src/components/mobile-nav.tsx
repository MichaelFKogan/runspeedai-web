'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { navItems } from '@/components/navigation-data'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) {
      closeRef.current?.focus()
      wasOpen.current = true
      return
    }

    if (wasOpen.current) {
      triggerRef.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen(true)}
        ref={triggerRef}
      >
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-4 rounded bg-foreground" />
          <span className="h-0.5 w-4 rounded bg-foreground" />
          <span className="h-0.5 w-4 rounded bg-foreground" />
        </div>
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false)
            }
          }}
        >
          <div
            id="mobile-nav-panel"
            className="absolute right-0 top-0 h-full w-72 border-l border-border bg-background p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Navigate</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                ref={closeRef}
              >
                ✕
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="rounded-md text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
