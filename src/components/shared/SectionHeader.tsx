import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  className?: string
}

export function SectionHeader({ label, className }: SectionHeaderProps) {
  return (
    <span
      className={cn(
        "mb-2.5 px-3 text-[11px] font-bold tracking-[0.2em] text-muted-foreground/35 uppercase select-none transition-colors",
        className
      )}
    >
      {label}
    </span>
  )
}
