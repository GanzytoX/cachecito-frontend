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
        label: "Notificaciones",
        description: "Alertas y sonidos",
        icon: IconBell,
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
      },
      {
        id: "appearance",
        label: "Apariencia",
        description: "Tema y personalización",
        icon: IconPalette,
        iconColor: "text-primary/70",
        iconBg: "bg-primary/8",
      },
    ],
  },
  {
    section: "Privacidad",
    items: [
      {
        id: "privacy",
        label: "Privacidad y Seguridad",
        description: "Contraseña y datos",
        icon: IconLock,
        iconColor: "text-primary/80",
        iconBg: "bg-primary/10",
      },
      {
        id: "permissions",
        label: "Permisos",
        description: "Accesos de la app",
        icon: IconShieldCheck,
        iconColor: "text-primary/60",
        iconBg: "bg-primary/8",
      },
    ],
  },
  {
    section: "Soporte",
    items: [
      {
        id: "help",
        label: "Ayuda",
        description: "Centro de ayuda y FAQ",
        icon: IconHelpCircle,
        iconColor: "text-muted-foreground/50",
        iconBg: "bg-muted/50",
      },
    ],
  },
]
