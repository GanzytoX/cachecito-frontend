import useSWR from "swr"
import {
  IconBellOff,
  IconChecks,
  IconCalendar,
  IconCheck,
  IconX,
  IconLoader2,
} from "@tabler/icons-react"
import { PageHeader, ListTile, EmptyState, Tabs, TabsList, TabsTrigger } from "@shared/ui"
import { socketService } from "@shared/api/socket"
import { CURRENT_HUMAN_ID, BASE_URL } from "@shared/api/api"
import { fetcher } from "@shared/api/fetcher"
import type { Appointment } from "@entities/appointment"

export function NotificationsPage() {
  const {
    data: appointments = [],
    error,
    isLoading,
    mutate,
  } = useSWR<Appointment[]>(
    `${BASE_URL}/notifications?humanId=${CURRENT_HUMAN_ID}`,
    fetcher
  )

  const handleAction = async (id: number, status: "CONFIRMED" | "REJECTED") => {
    try {
      // Optimistic update
      const filtered = appointments.filter((app: Appointment) => app.id !== id)
      mutate(filtered, false)

      // Use socket instead of fetch
      socketService.confirmAppointment(id, status)

      // Since it's a socket emit (fire and forget for now), we don't await a response
      // but we can listen for updates if the protocol allowed it.
    } catch (error) {
      console.error(`Failed to ${status} appointment:`, error)
      mutate() // Rollback if error
    }
  }

  const pendingCount = appointments.filter(
    (a: Appointment) => a.status === "PENDING_CONFIRMATION"
  ).length

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Notifications" actionIcon={IconChecks}>
        <Tabs defaultValue="Pending" className="mt-6">
          <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl border border-border/50 bg-card/50 p-1 shadow-sm backdrop-blur-2xl">
            <TabsTrigger
              value="Pending"
              className="rounded-xl text-[11px] font-bold tracking-wider uppercase data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Pending{pendingCount > 0 && ` (${pendingCount})`}
            </TabsTrigger>
            <TabsTrigger
              value="History"
              className="rounded-xl text-[11px] font-bold tracking-wider uppercase data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <IconLoader2 className="h-6 w-6 animate-spin text-primary/40" />
            </div>
          ) : error ? (
            <EmptyState
              icon={IconBellOff}
              title="Sync error"
              description="Could not fetch notifications. Please try again."
            />
          ) : appointments.length > 0 ? (
            appointments.map((app: Appointment) => (
              <ListTile
                key={app.id}
                title={app.subject}
                subtitle={`${app.date} at ${app.time}`}
                icon={IconCalendar}
                iconColor="text-primary"
                iconBg="bg-primary/10"
                variant="notification"
                trailing={
                  <div className="flex items-center gap-2 pr-1">
                    <button
                      onClick={() => handleAction(app.id, "REJECTED")}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive active:scale-90"
                    >
                      <IconX size={18} stroke={2.5} />
                    </button>
                    <button
                      onClick={() => handleAction(app.id, "CONFIRMED")}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 active:scale-90"
                    >
                      <IconCheck size={18} stroke={2.5} />
                    </button>
                  </div>
                }
              />
            ))
          ) : (
            <EmptyState
              icon={IconBellOff}
              title="All clear"
              description="No pending invitations."
            />
          )}
        </div>
      </div>
    </div>
  )
}
