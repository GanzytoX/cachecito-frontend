import {
  IconBellOff,
  IconUserPlus,
  IconCash,
  IconArrowDownRight,
  IconArrowUpRight,
  IconShieldCheck,
  IconChecks,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications } from "./data"

const iconMap = {
  transfer_in: {
    icon: IconArrowDownRight,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
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
    color: "text-amber-500",
    bg: "bg-amber-500/10",
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
      <header className="sticky top-0 z-10 bg-background/50 px-6 py-6 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground/90">Activity</h1>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-xl bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all active:scale-90"
          >
            <IconChecks size={20} stroke={1.8} />
          </Button>
        </div>

        <Tabs defaultValue="All" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-card backdrop-blur-3xl h-12 p-1 border border-white/10 shadow-sm">
            <TabsTrigger
              value="All"
              className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-white/90 dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Unread"
              className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-white/90 dark:data-[state=active]:bg-white/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300"
            >
              Unread{unreadCount > 0 && ` (${unreadCount})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <div className="px-4">
        <div className="flex flex-col gap-1 pb-52">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notification) => {
              const config = iconMap[notification.type]
              const Icon = config.icon
              return (
                <button
                  key={notification.id}
                  className={`group flex items-start gap-4 rounded-xl px-3 py-3.5 text-left transition-colors active:bg-white/5 ${!notification.read ? "bg-primary/3" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bg} ${config.color}`}
                  >
                    <Icon size={19} stroke={1.6} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-[14px] tracking-tight ${!notification.read ? "font-semibold" : "font-medium text-foreground/70"}`}
                      >
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-[12px] text-muted-foreground/50">
                      {notification.description}
                    </span>
                    <span className="mt-0.5 text-[11px] text-muted-foreground/30">
                      {notification.time}
                    </span>
                  </div>
                </button>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center px-8">
              <div className="p-10 rounded-2xl bg-primary/5 mb-8 backdrop-blur-2xl border border-white/10 shadow-sm">
                <IconBellOff
                  size={56}
                  className="text-primary/20"
                  stroke={1.2}
                />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground/80">
                All clear
              </h3>
              <p className="text-sm text-muted-foreground/50 mt-3 max-w-[220px] leading-relaxed">
                No activity yet. We'll keep you posted.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
