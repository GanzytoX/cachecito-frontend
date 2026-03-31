import { useParams, useNavigate } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { IconArrowLeft, IconSend2, IconPlus, IconMicrophone, IconLoader2, IconPhoto, IconPaperclip, IconCircleCheck, IconUser, IconRobot, IconArrowRight, IconSparkles } from "@tabler/icons-react"
import { cn } from "@/shared/lib/utils"
import { Avatar } from "@/shared/ui/Avatar"
import { socketService } from "@/shared/api/socket"
import { storage } from "@/shared/lib/storage"
import { registerUser } from "@/shared/api/api"
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
  const [manifestInfo, setManifestInfo] = useState<any>(null)
  
  // Registration state
  const [currentUser, setCurrentUser] = useState<{ id: string, name: string, aiPersona: string } | null>(() => storage.getUser())
  const [isRegistering, setIsRegistering] = useState(false)
  const [regName, setRegName] = useState("")
  const [regPersona, setRegPersona] = useState("")

  const isAgent = chatId?.startsWith("agent") || chatId === "ai-agent"
  
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

  // Socket setup
  useEffect(() => {
    if (!chatId || !currentUser) return;

    // Join the chat
    socketService.joinChat(chatId);

    // Listen for new messages
    socketService.onNewMessage((data) => {
      console.log("New message received via socket:", data);
      const agentMsg: Message = {
        id: data.id || Date.now().toString(),
        chatId: chatId,
        text: typeof data.content === 'string' ? data.content : JSON.stringify(data.content, null, 2),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromMe: data.userId === currentUser.id,
      };
      
      // Only add if it's not from me (me messages are added optimistically)
      if (data.userId !== currentUser.id) {
        setMessages(prev => [...prev, agentMsg]);
      }
    });

    // Listen for agent status
    socketService.onAgentStatus((data) => {
      console.log("Agent status update:", data);
      setIsTyping(data.status === "thinking" || data.status === "analyzing" || data.status === "typing");
    });

    // Listen for manifest updates
    socketService.onManifestUpdated((data) => {
      console.log("Manifest updated:", data);
      setManifestInfo(data);
      
      // Add a system message or notification with manifest data summary
      const summary = data?.summary || "Cambios en el manifiesto de acuerdos";
      const systemMsg: Message = {
        id: `manifest-${Date.now()}`,
        chatId: chatId,
        text: `📜 Acuerdo actualizado: ${summary}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromMe: false,
        type: 'system'
      };
      setMessages(prev => [...prev, systemMsg]);
    });

    return () => {
      // socketService.disconnect(); 
    };
  }, [chatId, currentUser, manifestInfo]);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regName.trim() || !regPersona.trim()) return
    
    setIsRegistering(true)
    try {
      const user = await registerUser(regName, regPersona)
      const userData = { id: user.id, name: regName, aiPersona: regPersona }
      storage.saveUser(userData)
      setCurrentUser(userData)
    } catch (error) {
      console.error("Registration error:", error)
      alert("Error al registrar usuario. Revisa la conexión con el servidor.")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleSend = () => {
    if (!newMessage.trim() || !chatId || !currentUser) return

    const userMsg: Message = {
      id: Date.now().toString(),
      chatId: chatId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromMe: true
    }

    setMessages(prev => [...prev, userMsg])
    socketService.sendMessage(chatId, currentUser.id, newMessage);
    setNewMessage("")
  }

  const renderMessage = (message: Message) => {
    const isSystem = message.type === 'system';
    
    if (isSystem) {
      return (
        <div key={message.id} className="flex justify-center my-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <IconCircleCheck size={16} stroke={2.5} />
            <span className="text-[11px] font-bold uppercase tracking-wider">{message.text}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        key={message.id}
        className={cn("flex", message.fromMe ? "justify-end" : "justify-start")}
      >
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-1 duration-300",
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
    );
  }

  // Registration View
  if (!currentUser) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 bg-background space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-2 shadow-2xl shadow-primary/10">
            <IconSparkles size={40} stroke={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Bienvenido a Cachecito</h1>
          <p className="text-muted-foreground/60 max-w-xs text-sm">Regístrate para comenzar a negociar con agentes de IA en tiempo real.</p>
        </div>

        <form onSubmit={handleRegister} className="w-full max-w-sm space-y-5 bg-card/50 backdrop-blur-xl p-6 rounded-3xl border border-border/50 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/40 ml-1">Tu Nombre</label>
              <div className="relative">
                <IconUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/30" size={18} />
                <input
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 rounded-2xl h-12 pl-11 pr-4 text-sm focus:border-primary/30 outline-none transition-all"
                  placeholder="Ej: Joaquin Holmes"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/40 ml-1">AI Persona (Negotiation Style)</label>
              <div className="relative">
                <IconRobot className="absolute left-3.5 top-3.5 text-muted-foreground/30" size={18} />
                <textarea
                  required
                  rows={3}
                  value={regPersona}
                  onChange={e => setRegPersona(e.target.value)}
                  className="w-full bg-background/50 border border-border/50 rounded-2xl p-4 pl-11 text-sm focus:border-primary/30 outline-none transition-all resize-none"
                  placeholder="Ej: Negociador agresivo orientado a resultados..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className="w-full bg-primary text-primary-foreground h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isRegistering ? (
              <IconLoader2 className="animate-spin" size={20} />
            ) : (
              <>
                Confirmar Registro
                <IconArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    )
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
        className="chat-pattern flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4 scrollbar-hide"
      >
        {messages.map(renderMessage)}
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
