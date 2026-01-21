'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const labelMap: Record<string, string> = {
  filters: 'Filters',
  create: 'Create',
  models: 'Models',
  gallery: 'Gallery',
  profile: 'Profile'
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const label = labelMap[segment] ?? segment
    return { href, label }
  })

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>
            {index === crumbs.length - 1 ? (
              <span className="text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
