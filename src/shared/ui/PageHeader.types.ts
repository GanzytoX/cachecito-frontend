import type { TablerIcon } from "@tabler/icons-react"

export interface PageHeaderProps {
  title: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  actionIcon?: TablerIcon
  onActionClick?: () => void
  children?: React.ReactNode
  className?: string
}
