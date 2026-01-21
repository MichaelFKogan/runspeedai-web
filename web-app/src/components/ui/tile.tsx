import * as React from 'react'

import { cn } from '@/lib/utils'

const Tile = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-within:-translate-y-1 focus-within:border-primary/40 focus-within:shadow-xl',
        className
      )}
      {...props}
    />
  )
)
Tile.displayName = 'Tile'

const TileMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex h-36 w-full items-center justify-center bg-muted transition duration-300 ease-out group-hover:scale-[1.02]',
        className
      )}
      {...props}
    />
  )
)
TileMedia.displayName = 'TileMedia'

const TileContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-1 flex-col gap-2 p-4', className)} {...props} />
  )
)
TileContent.displayName = 'TileContent'

const TileFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between p-4 pt-0', className)} {...props} />
  )
)
TileFooter.displayName = 'TileFooter'

export { Tile, TileMedia, TileContent, TileFooter }
