import * as React from 'react'

import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center',
        className
      )}
    >
      {icon ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  )
}
