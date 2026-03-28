import { useParams, useNavigate } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { IconArrowLeft, IconSend2, IconPlus, IconMicrophone, IconLoader2, IconPhoto, IconPaperclip } from "@tabler/icons-react"
import { cn } from "@/shared/lib/utils"
import { Avatar } from "@/shared/ui/Avatar"
import { sendRequest } from "@/shared/api/api"
import { storage } from "@/shared/lib/storage"
import type { Message } from "@/entities/message/model/types"

export function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const attachRef = useRef<HTMLDivElement>(null)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [attachMenuOpen, setAttachMenuOpen] = useState(false)

  const isAgent = chatId?.startsWith("agent")
  
  const chat = (() => {
    if (!chatId) return undefined
    const storedChats = storage.getChats()
    const found = storedChats.find(c => c.id === chatId)
    if (found) return found
    if (isAgent) {
      return { id: chatId, name: "Cachecito Agent", initials: "AI", online: true, lastMessage: "", time: "Now", unread: 0 }
    }
    return undefined
  })()

  useEffect(() => {
    if (chatId) {
      const storedMessages = storage.getMessages(chatId)
      if (storedMessages.length > 0) {
        setMessages(storedMessages)
      } else if (isAgent) {
        setMessages([
          { id: "msg-0", chatId: chatId, text: "Hello, I'm your Cachecito agent. How can I help you today?", time: "Now", fromMe: false }
        ])
      }
    }
  }, [chatId, isAgent])

  useEffect(() => {
    if (chatId && messages.length > 0) {
      storage.saveMessages(chatId, messages, chat || undefined)
    }
  }, [messages, chatId, chat])

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Click away for attach menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(event.target as Node)) {
        setAttachMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSend = async () => {
    if (!newMessage.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      chatId: chatId!,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromMe: true
    }

    setMessages(prev => [...prev, userMsg])
    const command = newMessage
    setNewMessage("")

    if (isAgent) {
      setIsTyping(true)
      try {
        const result = await sendRequest(command)
        const agentMsg: Message = {
          id: (Date.now() + 1).toString(),
          chatId: chatId!,
          text: JSON.stringify(result, null, 2),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fromMe: false
        }
        setMessages(prev => [...prev, agentMsg])
      } catch (error: any) {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          chatId: chatId!,
          text: error.message || "Connection error.",
          time: "Now",
          fromMe: false
        }
        setMessages(prev => [...prev, errorMsg])
      } finally {
        setIsTyping(false)
      }
    }
  }

  if (!chat) return <div className="flex flex-1 items-center justify-center">Chat not found</div>

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
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
            {chat.online ? "Online" : "Offline"}
          </span>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="chat-pattern flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.fromMe ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm transition-all",
                message.fromMe
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border/50 text-foreground/80 rounded-bl-md"
              )}
            >
              <p className="text-[13.5px] leading-relaxed">{message.text}</p>
              <span className={cn("mt-1 block text-[10px] text-right", message.fromMe ? "text-primary-foreground/50" : "text-muted-foreground/30")}>
                {message.time}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border/50 px-5 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <IconLoader2 className="h-4 w-4 animate-spin text-primary/40" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-background/50 backdrop-blur-2xl px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2 relative">
          <div ref={attachRef} className="relative">
            {attachMenuOpen && (
              <div className="absolute bottom-full left-0 mb-4 flex w-48 flex-col gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-foreground/70 hover:bg-foreground/5 active:scale-95 transition-all text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconPhoto size={18} stroke={1.5} />
                  </div>
                  <span>Upload Image</span>
                </button>
                <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-foreground/70 hover:bg-foreground/5 active:scale-95 transition-all text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconPaperclip size={18} stroke={1.5} />
                  </div>
                  <span>Attach File</span>
                </button>
              </div>
            )}
            <button 
              onClick={() => setAttachMenuOpen(!attachMenuOpen)}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
                attachMenuOpen ? "bg-primary text-primary-foreground rotate-45" : "bg-muted/50 text-muted-foreground/40"
              )}
            >
              <IconPlus size={20} stroke={2} />
            </button>
          </div>
          
          <div className="relative flex-1">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="h-11 w-full rounded-2xl border border-border/50 bg-card/50 px-4 text-[13.5px] outline-none transition-all focus:border-primary/30"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <button
            onClick={handleSend}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
              newMessage.trim() ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted/50 text-muted-foreground/40"
            )}
          >
            {newMessage.trim() ? <IconSend2 size={18} stroke={2.2} /> : <IconMicrophone size={20} stroke={2} />}
          </button>
        </div>
      </div>
    </div>
  )
}
