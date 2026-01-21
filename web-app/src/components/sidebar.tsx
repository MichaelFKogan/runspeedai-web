import Link from 'next/link'

import { navItems } from '@/components/navigation-data'

export function Sidebar() {
  return (
    <aside className="sticky top-24 hidden h-fit w-56 flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm lg:flex">
      <p className="text-xs font-semibold uppercase text-muted-foreground">Navigation</p>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
