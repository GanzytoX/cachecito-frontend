import { useParams, useNavigate } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { IconArrowLeft, IconSend2, IconPlus, IconPhoto, IconPaperclip, IconMicrophone } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { mockChats, mockMessages } from "./data"
import { Avatar } from "@/components/shared/Avatar"

export function ChatView() {
  const { chatId } = useParams<{ chatId: string }>()
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [newMessage, setNewMessage] = useState("")
  const [attachMenuOpen, setAttachMenuOpen] = useState(false)
  const attachRef = useRef<HTMLDivElement>(null)

  // Close attachment menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
        setAttachMenuOpen(false)
      }
    }
    if (attachMenuOpen) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [attachMenuOpen])

  const chat = mockChats.find((c) => c.id === chatId)
  const messages = mockMessages.filter((m) => m.chatId === chatId)

  // Auto-scroll to bottom on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatId])

  if (!chat) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground/50">
        Chat not found
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-background/50 px-4 py-4 backdrop-blur-2xl border-b border-border transition-all duration-300">
        <button
          onClick={() => navigate("/messages")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground/60 transition-all hover:bg-foreground/5 hover:text-foreground active:scale-90"
        >
          <IconArrowLeft size={20} stroke={2} />
        </button>

        <Avatar initials={chat.initials} online={chat.online} size="sm" />

        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="text-[14px] font-bold tracking-tight text-foreground/90 truncate">
            {chat.name}
          </span>
          <span className="text-[11px] text-muted-foreground/40">
            {chat.online ? "En línea" : "Desconectado"}
          </span>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="chat-pattern flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.fromMe ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 transition-all",
                message.fromMe
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border/50 text-foreground/80 rounded-bl-md"
              )}
            >
              <p className="text-[13.5px] leading-relaxed">{message.text}</p>
              <span
                className={cn(
                  "mt-1 block text-[10px] text-right",
                  message.fromMe
                    ? "text-primary-foreground/50"
                    : "text-muted-foreground/30"
                )}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/50 backdrop-blur-2xl px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <div ref={attachRef} className="relative">
            <button
              onClick={() => setAttachMenuOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
                attachMenuOpen
                  ? "bg-primary/10 text-primary"
                  : "bg-muted/50 text-muted-foreground/40 hover:bg-foreground/5 hover:text-muted-foreground/60"
              )}
            >
              <IconPlus
                size={20}
                stroke={2}
                className={cn("transition-transform duration-200", attachMenuOpen && "rotate-45")}
              />
            </button>

            {/* Attachment Menu */}
            <div
              className={cn(
                "absolute bottom-full left-0 mb-2 flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/90 backdrop-blur-2xl shadow-lg transition-all duration-200 origin-bottom-left",
                attachMenuOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-90 opacity-0"
              )}
            >
              <button
                onClick={() => setAttachMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-foreground/80 whitespace-nowrap transition-colors hover:bg-foreground/5"
              >
                <IconPhoto size={18} stroke={1.8} className="text-primary" />
                Subir foto
              </button>
              <div className="mx-3 h-px bg-border/40" />
              <button
                onClick={() => setAttachMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-foreground/80 whitespace-nowrap transition-colors hover:bg-foreground/5"
              >
                <IconPaperclip size={18} stroke={1.8} className="text-primary" />
                Adjuntar archivo
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="h-11 w-full rounded-2xl border border-border/50 bg-card/50 px-4 text-[13.5px] font-medium text-foreground placeholder:text-muted-foreground/40 outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  setNewMessage("")
                }
              }}
            />
          </div>
          <button
            onClick={() => {
              if (newMessage.trim()) setNewMessage("")
            }}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
              newMessage.trim()
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted/50 text-muted-foreground/40 hover:bg-foreground/5 hover:text-muted-foreground/60"
            )}
          >
            {newMessage.trim() ? (
              <IconSend2 size={18} stroke={2.2} />
            ) : (
              <IconMicrophone size={20} stroke={2} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
