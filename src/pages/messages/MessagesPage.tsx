import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { IconMessageOff, IconEdit } from "@tabler/icons-react"
import { PageHeader } from "@/shared/ui/PageHeader"
import { ListTile } from "@/shared/ui/ListTile"
import { EmptyState } from "@/shared/ui/EmptyState"
import { storage } from "@/shared/lib/storage"
import type { Chat } from "@/entities/message/model/types"

export function MessagesPage() {
  const navigate = useNavigate()
  const [chats] = useState<Chat[]>(() => {
    const storedChats = storage.getChats()
    const validChats = storedChats.filter(c => {
      const msgs = storage.getMessages(c.id)
      return msgs.some(m => m.fromMe)
    })
    if (validChats.length !== storedChats.length) {
      localStorage.setItem("cachecito_chats", JSON.stringify(validChats))
    }
    return validChats
  })

  const handleNewChat = () => {
    const threadId = `agent-${Date.now()}`
    navigate(`/messages/${threadId}`)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Messages"
        searchPlaceholder="Search conversations..."
        actionIcon={IconEdit}
        onActionClick={handleNewChat}
      />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {/* List of active threads */}
          {chats.length > 0 ? (
            <>
              <span className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/30">
                Recent conversations
              </span>
              {chats.map((chat: Chat) => (
                <ListTile
                  key={chat.id}
                  title={chat.name}
                  subtitle={chat.lastMessage}
                  time={chat.time}
                  initials={chat.initials}
                  online={chat.online}
                  unreadCount={chat.unread}
                  variant="chat"
                  onClick={() => navigate(`/messages/${chat.id}`)}
                />
              ))}
            </>
          ) : (
            <div className="mt-12 flex flex-col gap-2">
              <EmptyState
                icon={IconMessageOff}
                title="No recent chats"
                description="Click the icon at the top right to start a new chat."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
