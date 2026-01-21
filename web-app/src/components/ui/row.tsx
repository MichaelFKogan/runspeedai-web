import * as React from 'react'

import { cn } from '@/lib/utils'

const Row = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/40',
        className
      )}
      {...props}
    />
  )
)
Row.displayName = 'Row'

const RowMeta = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-3', className)} {...props} />
  )
)
RowMeta.displayName = 'RowMeta'

const RowDetails = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
  )
)
RowDetails.displayName = 'RowDetails'

const RowActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  )
)
RowActions.displayName = 'RowActions'

export { Row, RowMeta, RowDetails, RowActions }
