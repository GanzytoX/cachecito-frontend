import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { IconMessageOff, IconEdit, IconLoader2, IconArrowLeft, IconSparkles, IconUserSearch } from "@tabler/icons-react"
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
  
  // Selection state
  const [isSelectingUser, setIsSelectingUser] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<any[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  useEffect(() => {
    const storedChats = storage.getChats()
    // Show chats that exist in storage
    setActiveChats(storedChats)
  }, [])

  const fetchUsersToSelect = async () => {
    const currentUser = storage.getUser()
    if (!currentUser) {
      navigate("/messages/registration")
      return
    }

    setIsLoadingUsers(true)
    setIsSelectingUser(true)
    try {
      const users = await listUsers()
      // Filter out me
      const others = users.filter(u => u.id !== currentUser.id)
      setAvailableUsers(others)
    } catch (error) {
      console.error("Error fetching users:", error)
      alert("No se pudo cargar la lista de usuarios.")
      setIsSelectingUser(false)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleStartNegotiation = async (counterpart: any) => {
    const currentUser = storage.getUser()
    if (!currentUser) return

    setIsCreating(true)
    setIsSelectingUser(false)
    try {
      // 4. Create chat session in backend
      const { id: chatId } = await createChat([currentUser.id, counterpart.id])
      
      // 5. Save chat context locally
      const newChat: Chat = {
        id: chatId,
        name: counterpart.name || "Counterpart",
        initials: (counterpart.name || "C").substring(0, 2).toUpperCase(),
        online: true,
        lastMessage: "Inicia la negociación...",
        time: "Now",
        unread: 0
      }
      
      storage.saveChat(newChat)
      setActiveChats(prev => [newChat, ...prev.filter(c => c.id !== chatId)])
      navigate(`/messages/${chatId}`)
    } catch (error) {
      console.error("Error creating chat:", error)
      alert("Error al iniciar chat de negociación.")
    } finally {
      setIsCreating(false)
    }
  }

  if (isSelectingUser) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden bg-background animate-in fade-in slide-in-from-right-4 duration-300">
        <header className="px-6 py-8 flex flex-col gap-2">
          <button onClick={() => setIsSelectingUser(false)} className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted/50 text-muted-foreground self-start mb-2 active:scale-95 transition-all">
            <IconArrowLeft size={20} stroke={2} />
          </button>
          <h2 className="text-2xl font-bold tracking-tight">Nueva Negociación</h2>
          <p className="text-muted-foreground/50 text-sm">Selecciona con quién quieres iniciar el acuerdo.</p>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-3 scrollbar-hide">
          {isLoadingUsers ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground/30">
              <IconLoader2 className="animate-spin" size={24} />
              <span className="text-[11px] font-bold uppercase tracking-widest">Cargando negociadores...</span>
            </div>
          ) : availableUsers.length > 0 ? (
            availableUsers.map((user) => (
              <button 
                key={user.id} 
                onClick={() => handleStartNegotiation(user)}
                className="w-full flex items-center gap-4 p-4 rounded-3xl bg-card/40 border border-border/50 hover:bg-primary/5 hover:border-primary/20 active:scale-[0.98] transition-all group"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  {(user.name || "U").substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-[14px] leading-none mb-1">{user.name}</div>
                  <div className="text-[11px] text-muted-foreground/60 truncate max-w-[200px]">{user.aiPersona || "Negociador estándar"}</div>
                </div>
                <IconSparkles size={18} className="text-primary/20 group-hover:text-primary transition-all" />
              </button>
            ))
          ) : (
            <EmptyState 
              icon={IconUserSearch} 
              title="Sin contrapartes" 
              description="No hay otros usuarios registrados en el servidor actualmente." 
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Messages"
        searchPlaceholder="Search conversations..."
        actionIcon={isCreating ? IconLoader2 : IconEdit}
        onActionClick={fetchUsersToSelect}
      />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {isCreating && (
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl animate-pulse mx-1">
              <IconLoader2 className="animate-spin text-primary" size={20} />
              <span className="text-xs font-medium text-primary">Abriendo canal de negociación...</span>
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
                description="Presiona el icono de arriba para iniciar una negociación."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
