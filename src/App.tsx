import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { MessagesPage } from "@/pages/messages/MessagesPage"
import { ChatPage } from "@/pages/messages/ChatPage"
import { ContactsPage } from "@/pages/contacts/ContactsPage"
import { NotificationsPage } from "@/pages/notifications/NotificationsPage"
import { SettingsPage } from "@/pages/settings/SettingsPage"
import { BottomNav } from "@/widgets/bottom-nav"

export function App() {
  const location = useLocation()
  const isChatOpen = location.pathname.startsWith("/messages/")

  return (
    <div className="relative flex h-svh flex-col overflow-hidden bg-background">
      {/* View Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/messages" replace />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:chatId" element={<ChatPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>

      {/* Floating Navigation — hidden inside chat */}
      {!isChatOpen && <BottomNav />}
    </div>
  )
}
