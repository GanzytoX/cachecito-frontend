import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { MessagesPage } from "@pages/messages"
import { ChatPage } from "@pages/chat"
import { ContactsPage } from "@pages/contacts"
import { NotificationsPage } from "@pages/notifications"
import { SettingsPage } from "@pages/settings"
import { RegistrationPage } from "@pages/registration"
import { BottomNav } from "@widgets/bottom-nav"
import { AuthGuard } from "./providers/AuthGuard"
import { PublicGuard } from "./providers/PublicGuard"

export function App() {
  const location = useLocation()
  const isChatOpen = location.pathname.startsWith("/messages/")
  const isRegistration = location.pathname === "/registration"

  return (
    <div className="relative flex h-svh flex-col overflow-hidden bg-background">
      {/* View Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/messages" replace />} />
          
          <Route element={<PublicGuard />}>
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>
          
          <Route element={<AuthGuard />}>
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:chatId" element={<ChatPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>

      {/* Floating Navigation — hidden inside chat or registration */}
      {!isChatOpen && !isRegistration && <BottomNav />}
    </div>
  )
}
