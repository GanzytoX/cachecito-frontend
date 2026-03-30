export interface SettingsMenuItem {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ size?: number; stroke?: number }>
  iconColor: string
  iconBg: string
}

export interface SettingsSection {
  section: string
  items: SettingsMenuItem[]
}
