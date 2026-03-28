import {
  IconBellOff,
  IconUserPlus,
  IconCash,
  IconArrowDownRight,
  IconArrowUpRight,
  IconShieldCheck,
  IconChecks,
} from "@tabler/icons-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications } from "./data"
import { PageHeader } from "@/components/shared/PageHeader"
import { ListTile } from "@/components/shared/ListTile"
import { EmptyState } from "@/components/shared/EmptyState"

const iconMap = {
  transfer_in: {
    icon: IconArrowDownRight,
    color: "text-success",
    bg: "bg-success/10",
  },
  transfer_out: {
    icon: IconArrowUpRight,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  friend_request: {
    icon: IconUserPlus,
    color: "text-primary/70",
    bg: "bg-primary/8",
  },
  security: {
    icon: IconShieldCheck,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  promo: {
    icon: IconCash,
    color: "text-primary/60",
    bg: "bg-primary/8",
  },
}

export function NotificationsView() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Notifications"
        actionIcon={IconChecks}
      >
        <Tabs defaultValue="All" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-card/50 backdrop-blur-2xl h-12 p-1 border border-border/50 shadow-sm">
            <TabsTrigger
              value="All"
              className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Unread"
              className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
            >
              Unread{unreadCount > 0 && ` (${unreadCount})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      <div className="page-container mt-2">
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification) => {
            const config = iconMap[notification.type]
            return (
              <ListTile
                key={notification.id}
                title={notification.title}
                subtitle={notification.description}
                time={notification.time}
                icon={config.icon}
                iconColor={config.color}
                iconBg={config.bg}
                unread={!notification.read}
                variant="notification"
              />
            )
          })
        ) : (
          <EmptyState
            icon={IconBellOff}
            title="All clear"
            description="No activity yet. We'll keep you posted."
          />
        )}
      </div>
    </div>
  )
}
