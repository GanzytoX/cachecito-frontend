import { cn } from "@/lib/utils"
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
}: ListTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full gap-4 rounded-xl px-3 py-3.5 text-left transition-all active:scale-[0.98]",
        variant === "settings" ? "items-center" : "items-start",
        unread && variant === "notification" && "bg-primary/5",
        "active:bg-primary/5 hover:bg-white/5 dark:hover:bg-white/5",
        className
      )}
    >
      {/* Leading */}
      {leading ? leading : (
        initials ? (
          <Avatar initials={initials} online={online} size={variant === "settings" ? "lg" : "md"} />
        ) : Icon ? (
          <div className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm border border-white/10", iconBg, iconColor)}>
            <Icon size={19} stroke={1.6} />
          </div>
        ) : null
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <span className={cn(
            "text-[14px] tracking-tight truncate",
            (unread || (unreadCount ?? 0) > 0) ? "font-bold text-foreground" : "font-medium text-foreground/80"
          )}>
            {title}
          </span>
          <div className="flex items-center gap-2.5">
            {time && (
              <span className={cn(
                "text-[11px] shrink-0 mt-0.5",
                (unreadCount ?? 0) > 0 ? "font-semibold text-primary" : "text-muted-foreground/30"
              )}>
                {time}
              </span>
            )}
            {unread && variant === "notification" && (
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
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
          {typeof unreadCount === "number" && unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-primary-foreground shadow-lg shadow-primary/20">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {variant === "settings" && (
        <IconChevronRight
          size={16}
          className="shrink-0 text-muted-foreground/30 group-hover:translate-x-0.5 transition-transform"
        />
      )}

      {trailing && <div className="shrink-0">{trailing}</div>}
    </button>
  )
}
