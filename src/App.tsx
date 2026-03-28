import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { MessagesView } from "@/features/messages/MessagesView"
import { ChatView } from "@/features/messages/ChatView"
import { ContactsView } from "@/features/contacts/ContactsView"
import { NotificationsView } from "@/features/notifications/NotificationsView"
import { SettingsView } from "@/features/settings/SettingsView"
import { BottomNav } from "@/components/layout/bottom-nav"

export function App() {
  const location = useLocation()
  const isChatOpen = location.pathname.startsWith("/messages/")

  return (
    <div className="relative flex h-svh flex-col overflow-hidden bg-background">
      {/* View Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/messages" replace />} />
          <Route path="/messages" element={<MessagesView />} />
          <Route path="/messages/:chatId" element={<ChatView />} />
          <Route path="/contacts" element={<ContactsView />} />
          <Route path="/notifications" element={<NotificationsView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </div>

      {/* Floating Navigation — hidden inside chat */}
      {!isChatOpen && <BottomNav />}
    </div>
  )
}
