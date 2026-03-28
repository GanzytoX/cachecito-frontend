import { cn } from "@/shared/lib/utils"

interface AvatarProps {
  initials: string
  online?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: "h-10 w-10 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-14 w-14 text-lg",
}

export function Avatar({
  initials,
  online,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/10 font-semibold tracking-tight",
          sizes[size]
        )}
      >
        {initials}
      </div>
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />
      )}
    </div>
  )
}
