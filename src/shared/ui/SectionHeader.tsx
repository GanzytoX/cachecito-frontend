import { cn } from "@/shared/lib/utils"

import type { SectionHeaderProps } from "./SectionHeader.types"

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <span
      className={cn(
        "mb-2.5 px-3 text-[11px] font-bold tracking-[0.2em] text-muted-foreground/35 uppercase transition-colors select-none",
        className
      )}
    >
      {label}
    </span>
  )
}
