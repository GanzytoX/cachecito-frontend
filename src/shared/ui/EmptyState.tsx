import { cn } from "@/shared/lib/utils"
import type { TablerIcon } from "@tabler/icons-react"

interface EmptyStateProps {
  icon: TablerIcon
  title: string
  description?: string
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center px-8", className)}>
      <div className="p-8 rounded-full bg-primary/5 mb-8 backdrop-blur-2xl border border-foreground/10 shadow-sm transition-all duration-500 hover:scale-105">
        <Icon size={44} className="text-primary/20" stroke={1.2} />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground/80">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground/50 mt-3 max-w-[220px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
