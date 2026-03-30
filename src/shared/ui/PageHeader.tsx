import { cn } from "@/shared/lib/utils"
import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/shared/ui/shadcn/input"
import { Button } from "@/shared/ui/shadcn/button"

import type { PageHeaderProps } from "./PageHeader.types"

export function PageHeader({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actionIcon: ActionIcon,
  onActionClick,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-10 bg-background/50 px-4 py-6 backdrop-blur-2xl border-b border-border transition-all duration-300", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-foreground/90">{title}</h1>
        {ActionIcon && (
          <Button
            variant="secondary"
            size="icon"
            onClick={onActionClick}
            className="rounded-xl h-10 w-10 bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all active:scale-90"
          >
            <ActionIcon size={20} stroke={2} />
          </Button>
        )}
      </div>

      {searchPlaceholder && (
        <div className="relative mt-4 group">
          <IconSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="bg-card border-none h-14 rounded-2xl pl-12 backdrop-blur-2xl focus-visible:ring-primary/20 transition-all shadow-none placeholder:text-muted-foreground/40 font-medium"
          />
        </div>
      )}

      {children}
    </header>
  )
}
