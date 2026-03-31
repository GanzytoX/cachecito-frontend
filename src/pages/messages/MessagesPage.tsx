import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { IconMessageOff, IconEdit, IconLoader2 } from "@tabler/icons-react"
import { PageHeader } from "@/shared/ui/PageHeader"
import { ListTile } from "@/shared/ui/ListTile"
import { EmptyState } from "@/shared/ui/EmptyState"
import { storage } from "@/shared/lib/storage"
import { listUsers, createChat } from "@/shared/api/api"
import type { Chat } from "@/entities/message/model/types"

export function MessagesPage() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [activeChats, setActiveChats] = useState<Chat[]>([])

  useEffect(() => {
    const storedChats = storage.getChats()
    // Only show chats that have at least one message from user (to clean up empty sessions)
    const validChats = storedChats.filter(c => {
      const msgs = storage.getMessages(c.id)
      return msgs.some(m => m.fromMe)
    })
    setActiveChats(validChats)
    
    if (validChats.length !== storedChats.length) {
      localStorage.setItem("cachecito_chats", JSON.stringify(validChats))
    }
  }, [])

  const handleNewChat = async () => {
    const currentUser = storage.getUser()
    if (!currentUser) {
      // If no user, navigate to chat page which will force registration
      navigate("/messages/new-negotiation")
      return
    }

    setIsCreating(true)
    try {
      // 1. Get available users
      const users = await listUsers()
      
      // 2. Filter out me
      const others = users.filter(u => u.id !== currentUser.id)
      
      if (others.length === 0) {
        alert("No hay otros usuarios registrados para negociar. Intenta de nuevo más tarde.")
        return
      }

      // 3. Pick the first available user as counterpart (for MVP)
      const counterpart = others[0]
      
      // 4. Create chat session in backend
      const { id: chatId } = await createChat([currentUser.id, counterpart.id])
      
      // 5. Save chat context locally
      const newChat: Chat = {
        id: chatId,
        name: counterpart.name || "Counterpart",
        initials: (counterpart.name || "C").substring(0, 2).toUpperCase(),
        online: true,
        lastMessage: "",
        time: "Now",
        unread: 0
      }
      
      storage.saveChat(newChat)
      navigate(`/messages/${chatId}`)
    } catch (error) {
      console.error("Error creating chat:", error)
      alert("Error al iniciar chat. ¿El servidor está corriendo?")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Messages"
        searchPlaceholder="Search conversations..."
        actionIcon={isCreating ? IconLoader2 : IconEdit}
        onActionClick={handleNewChat}
      />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {isCreating && (
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl animate-pulse">
              <IconLoader2 className="animate-spin text-primary" size={20} />
              <span className="text-xs font-medium text-primary">Creating secure negotiation channel...</span>
            </div>
          )}

          {activeChats.length > 0 ? (
            <>
              <span className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/30">
                Recent conversations
              </span>
              {activeChats.map((chat: Chat) => (
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
          ) : !isCreating && (
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
