import { cn } from "@shared/lib/utils"
import { IconSearch } from "@tabler/icons-react"
import { Input, Button } from "@shared/ui"

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
    <header
      className={cn(
        "sticky top-0 z-10 border-b border-border bg-background/50 px-4 py-6 backdrop-blur-2xl transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-foreground/90">{title}</h1>
        {ActionIcon && (
          <Button
            variant="secondary"
            size="icon"
            onClick={onActionClick}
            className="h-10 w-10 rounded-xl border-none bg-primary/10 text-primary transition-all hover:bg-primary/20 active:scale-90"
          >
            <ActionIcon size={20} stroke={2} />
          </Button>
        )}
      </div>

      {searchPlaceholder && (
        <div className="group relative mt-4">
          <IconSearch className="absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-focus-within:text-primary" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-14 rounded-2xl border-none bg-card pl-12 font-medium shadow-none backdrop-blur-2xl transition-all placeholder:text-muted-foreground/40 focus-visible:ring-primary/20"
          />
        </div>
      )}

      {children}
    </header>
  )
}
