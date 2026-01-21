import * as React from 'react'

import { cn } from '@/lib/utils'

const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)} {...props} />
  )
)
Grid.displayName = 'Grid'

const GridItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props} />
  )
)
GridItem.displayName = 'GridItem'

export { Grid, GridItem }
