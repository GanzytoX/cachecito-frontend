import { cn } from "@/shared/lib/utils"
import { IconChevronRight } from "@tabler/icons-react"
import { Avatar } from "./Avatar"

interface ListTileProps {
  title: string
  subtitle?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  unread?: boolean
  initials?: string
  online?: boolean
  onClick?: () => void
  variant?: "chat" | "contact" | "notification" | "settings"
  icon?: React.ComponentType<{ size?: number; stroke?: number }>
  iconColor?: string
  iconBg?: string
  time?: string
  unreadCount?: number
  className?: string
  isActionable?: boolean
}

export function ListTile({
  title,
  subtitle,
  leading,
  trailing,
  unread,
  initials,
  online,
  onClick,
  variant = "chat",
  icon: Icon,
  iconColor,
  iconBg,
  time,
  unreadCount,
  className,
  isActionable = true,
}: ListTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick && !isActionable}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all",
        onClick && "active:scale-[0.98] active:bg-primary/10 hover:bg-foreground/5",
        // Card style for non-grouped variants
        ["chat", "notification", "contact"].includes(variant) && 
          "bg-card/30 border border-border/40 backdrop-blur-sm shadow-sm",
        unread && variant === "notification" && "bg-primary/5 border-primary/20",
        className
      )}
    >
      {/* Leading */}
      {leading ? leading : (
        initials ? (
          <Avatar initials={initials} online={online} size={variant === "settings" ? "lg" : "md"} />
        ) : Icon ? (
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm border border-foreground/10", iconBg, iconColor)}>
            <Icon size={19} stroke={1.6} />
          </div>
        ) : null
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "text-[14px] tracking-tight truncate",
            (unread || (unreadCount ?? 0) > 0) ? "font-bold text-foreground" : "font-medium text-foreground/80"
          )}>
            {title}
          </span>
          <div className="flex items-center gap-2.5">
            {time && (
              <span className={cn(
                "text-[11px] shrink-0",
                (unreadCount ?? 0) > 0 ? "font-semibold text-primary" : "text-muted-foreground/30"
              )}>
                {time}
              </span>
            )}
            {unread && variant === "notification" && (
              <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          {subtitle && (
            <span className={cn(
              "truncate text-[12.5px] leading-snug",
              (unread || (unreadCount ?? 0) > 0) ? "font-medium text-foreground/60" : "text-muted-foreground/45"
            )}>
              {subtitle}
            </span>
          )}
          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-primary-foreground shadow-lg shadow-primary/20">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {variant === "settings" && onClick && (
        <IconChevronRight
          size={16}
          className="shrink-0 text-muted-foreground/30 group-hover:translate-x-0.5 transition-transform"
        />
      )}

      {trailing && <div className="shrink-0 flex items-center">{trailing}</div>}
    </button>
  )
}
