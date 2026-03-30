export interface ListTileProps {
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
