import * as React from 'react'

import { cn } from '@/lib/utils'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className
}: PageHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  )
}
