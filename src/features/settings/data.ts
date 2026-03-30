import {
  IconBell,
  IconLock,
  IconHelpCircle,
  IconPalette,
  IconShieldCheck,
} from "@tabler/icons-react"
import type { SettingsSection } from "./types"

export const settingsMenuItems: SettingsSection[] = [
  {
    section: "General",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        description: "Alerts and sound effects",
        icon: IconBell,
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
      },
      {
        id: "appearance",
        label: "Appearance",
        description: "Themes and customization",
        icon: IconPalette,
        iconColor: "text-primary/70",
        iconBg: "bg-primary/8",
      },
    ],
  },
  {
    section: "Privacy",
    items: [
      {
        id: "privacy",
        label: "Privacy & Security",
        description: "Passwords and biometric data",
        icon: IconLock,
        iconColor: "text-primary/80",
        iconBg: "bg-primary/10",
      },
      {
        id: "permissions",
        label: "Permissions",
        description: "App access and tracking",
        icon: IconShieldCheck,
        iconColor: "text-primary/60",
        iconBg: "bg-primary/8",
      },
    ],
  },
  {
    section: "Support",
    items: [
      {
        id: "help",
        label: "Help Center",
        description: "FAQs and technical support",
        icon: IconHelpCircle,
        iconColor: "text-muted-foreground/50",
        iconBg: "bg-muted/50",
      },
    ],
  },
]
