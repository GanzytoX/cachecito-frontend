import useSWR from "swr"
import { IconBellOff, IconChecks, IconCalendar, IconCheck, IconX, IconLoader2 } from "@tabler/icons-react"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs"
import { PageHeader } from "@/shared/ui/PageHeader"
import { ListTile } from "@/shared/ui/ListTile"
import { EmptyState } from "@/shared/ui/EmptyState"
import { socketService } from "@/shared/api/socket"
import { CURRENT_HUMAN_ID, BASE_URL } from "@/shared/api/api"
import { fetcher } from "@/shared/api/fetcher"
import type { Appointment } from "@/shared/lib/types"

export function NotificationsPage() {
  const { 
    data: appointments = [], 
    error, 
    isLoading, 
    mutate 
  } = useSWR<Appointment[]>(`${BASE_URL}/notifications?humanId=${CURRENT_HUMAN_ID}`, fetcher)

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

  const pendingCount = appointments.filter((a: Appointment) => a.status === "PENDING_CONFIRMATION").length

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Notifications" actionIcon={IconChecks}>
        <Tabs defaultValue="Pending" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-card/50 backdrop-blur-2xl h-12 p-1 border border-border/50 shadow-sm rounded-2xl">
            <TabsTrigger value="Pending" className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              Pending{pendingCount > 0 && ` (${pendingCount})`}
            </TabsTrigger>
            <TabsTrigger value="History" className="rounded-xl font-bold text-[11px] uppercase tracking-wider data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
              History
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-20">
              <IconLoader2 className="h-6 w-6 animate-spin text-primary/40" />
            </div>
          ) : error ? (
            <EmptyState icon={IconBellOff} title="Sync error" description="Could not fetch notifications. Please try again." />
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
                    <button onClick={() => handleAction(app.id, "REJECTED")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive active:scale-90">
                      <IconX size={18} stroke={2.5} />
                    </button>
                    <button onClick={() => handleAction(app.id, "CONFIRMED")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 active:scale-90">
                      <IconCheck size={18} stroke={2.5} />
                    </button>
                  </div>
                }
              />
            ))
          ) : (
            <EmptyState icon={IconBellOff} title="All clear" description="No pending invitations." />
          )}
        </div>
      </div>
    </div>
  )
}
