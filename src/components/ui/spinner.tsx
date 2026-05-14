import { cn } from '@/lib/utils'
import { Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, HugeiconsIconProps } from '@hugeicons/react'

function Spinner({ className, ...props }: Omit<HugeiconsIconProps, 'icon'>) {
  return (
    <HugeiconsIcon
      role="status"
      aria-label="Loading"
      strokeWidth={2}
      className={cn('size-4 animate-spin', className)}
      {...props}
      icon={Loading03Icon}
    />
  )
}

export { Spinner }
