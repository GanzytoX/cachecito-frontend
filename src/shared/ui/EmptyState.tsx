import { cn } from "@/shared/lib/utils"

import type { EmptyStateProps } from "./EmptyState.types"

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-8 py-20 text-center",
        className
      )}
    >
      <div className="mb-8 rounded-full border border-foreground/10 bg-primary/5 p-8 shadow-sm backdrop-blur-2xl transition-all duration-500 hover:scale-105">
        <Icon size={44} className="text-primary/20" stroke={1.2} />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground/80">
        {title}
      </h3>
      {description && (
        <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-muted-foreground/50">
          {description}
        </p>
      )}
    </div>
  )
}
