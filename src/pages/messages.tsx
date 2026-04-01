import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  IconMessageOff,
  IconEdit,
  IconLoader2,
  IconArrowLeft,
  IconSparkles,
  IconUserSearch,
} from "@tabler/icons-react"
import { PageHeader, ListTile, EmptyState } from "@shared/ui"
import { messageStorage } from "@entities/message"
import { userStorage } from "@entities/user"
import type { User } from "@entities/user"
import { listUsers, createChat } from "@shared/api/api"
import type { Chat } from "@entities/message"

export function MessagesPage() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [activeChats, setActiveChats] = useState<Chat[]>([])

  // Selection state
  const [isSelectingUser, setIsSelectingUser] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  useEffect(() => {
    const storedChats = messageStorage.getChats()
    // Show chats that exist in storage
    setActiveChats(storedChats)
  }, [])

  const fetchUsersToSelect = async () => {
    const currentUser = userStorage.getUser()
    if (!currentUser) {
      navigate("/registration")
      return
    }

    setIsLoadingUsers(true)
    setIsSelectingUser(true)
    try {
      const users = await listUsers()
      // Filter out me
      const others = users.filter((u) => String(u.id) !== String(currentUser.id))
      setAvailableUsers(others)
    } catch (error) {
      console.error("Error fetching users:", error)
      alert("No se pudo cargar la lista de usuarios.")
      setIsSelectingUser(false)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleStartNegotiation = async (counterpart: User) => {
    const currentUser = userStorage.getUser()
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
        unread: 0,
      }

      messageStorage.saveChat(newChat)
      setActiveChats((prev) => [
        newChat,
        ...prev.filter((c) => c.id !== chatId),
      ])
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
      <div className="flex flex-1 flex-col overflow-hidden bg-background duration-300 animate-in fade-in slide-in-from-right-4">
        <header className="flex flex-col gap-2 px-6 py-8">
          <button
            onClick={() => setIsSelectingUser(false)}
            className="mb-2 flex h-10 w-10 items-center justify-center self-start rounded-xl bg-muted/50 text-muted-foreground transition-all active:scale-95"
          >
            <IconArrowLeft size={20} stroke={2} />
          </button>
          <h2 className="text-2xl font-bold tracking-tight">
            Nueva Negociación
          </h2>
          <p className="text-sm text-muted-foreground/50">
            Selecciona con quién quieres iniciar el acuerdo.
          </p>
        </header>

        <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto px-6 pb-12">
          {isLoadingUsers ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground/30">
              <IconLoader2 className="animate-spin" size={24} />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                Cargando negociadores...
              </span>
            </div>
          ) : availableUsers.length > 0 ? (
            availableUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleStartNegotiation(user)}
                className="group flex w-full items-center gap-4 rounded-3xl border border-border/50 bg-card/40 p-4 transition-all hover:border-primary/20 hover:bg-primary/5 active:scale-[0.98]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  {(user.name || "U").substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <div className="mb-1 text-[14px] leading-none font-bold">
                    {user.name}
                  </div>
                  <div className="max-w-[200px] truncate text-[11px] text-muted-foreground/60">
                    {user.aiPersona || "Negociador estándar"}
                  </div>
                </div>
                <IconSparkles
                  size={18}
                  className="text-primary/20 transition-all group-hover:text-primary"
                />
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

      <div className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto">
        <div className="page-container mt-2 flex flex-col gap-2.5">
          {isCreating && (
            <div className="mx-1 flex animate-pulse items-center gap-3 rounded-2xl bg-primary/5 p-4">
              <IconLoader2 className="animate-spin text-primary" size={20} />
              <span className="text-xs font-medium text-primary">
                Abriendo canal de negociación...
              </span>
            </div>
          )}

          {activeChats.length > 0 ? (
            <>
              <span className="px-1 text-[11px] font-bold tracking-wider text-muted-foreground/30 uppercase">
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
          ) : (
            !isCreating && (
              <div className="mt-12 flex flex-col gap-2">
                <EmptyState
                  icon={IconMessageOff}
                  title="No recent chats"
                  description="Presiona el icono de arriba para iniciar una negociación."
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
