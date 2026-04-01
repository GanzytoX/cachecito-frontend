import { useParams } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { IconLoader2 } from "@tabler/icons-react"

import { socketService } from "@shared/api/socket"
import { messageStorage, MessageBubble } from "@entities/message"
import { userStorage } from "@entities/user"
import type { Message } from "@entities/message"

import { MessageInput } from "@features/chat-message-input"
import { ChatHeader } from "@widgets/chat-header"

export function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [manifestInfo, setManifestInfo] = useState<unknown>(null)

  const currentUser = userStorage.getUser()
  const isAgent = chatId?.startsWith("agent") || chatId === "ai-agent"

  const chat = (() => {
    if (!chatId) return undefined
    const storedChats = messageStorage.getChats()
    const found = storedChats.find((c) => String(c.id) === chatId)
    if (found) return found
    if (isAgent) {
      return {
        id: chatId,
        name: "Cachecito AI Agent",
        initials: "AI",
        online: true,
        lastMessage: "",
        time: "Now",
        unread: 0,
      }
    }
    return undefined
  })()

  // Socket setup
  useEffect(() => {
    if (!chatId || !currentUser) return

    socketService.joinChat(chatId)

    socketService.onNewMessage((data) => {
      const agentMsg: Message = {
        id: data.id || Date.now().toString(),
        chatId: chatId,
        text:
          typeof data.content === "string"
            ? data.content
            : JSON.stringify(data.content, null, 2),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fromMe: data.userId === currentUser.id,
      }

      if (data.userId !== currentUser.id) {
        setMessages((prev) => [...prev, agentMsg])
      }
    })

    socketService.onAgentStatus((data) => {
      setIsTyping(
        data.status === "thinking" ||
          data.status === "analyzing" ||
          data.status === "typing"
      )
    })

    socketService.onManifestUpdated((data) => {
      setManifestInfo(data)
      const summary = data?.summary || "Cambios en el manifiesto de acuerdos"
      const systemMsg: Message = {
        id: `manifest-${Date.now()}`,
        chatId: chatId,
        text: `📜 Acuerdo actualizado: ${summary}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fromMe: false,
        type: "system",
      }
      setMessages((prev) => [...prev, systemMsg])
    })

    return () => {
      // socketService.disconnect();
    }
  }, [chatId, currentUser, manifestInfo])

  useEffect(() => {
    if (chatId) {
      const storedMessages = messageStorage.getMessages(chatId)
      if (storedMessages.length > 0) {
        setMessages(storedMessages)
      } else if (isAgent) {
        setMessages([
          {
            id: "msg-0",
            chatId: chatId,
            text: "Hello, I'm your Cachecito AI agent. How can I help you today?",
            time: "Now",
            fromMe: false,
          },
        ])
      }
    }
  }, [chatId, isAgent])

  useEffect(() => {
    if (chatId && messages.length > 0) {
      messageStorage.saveMessages(chatId, messages, chat || undefined)
    }
  }, [messages, chatId, chat])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!chatId || !currentUser) return

    const userMsg: Message = {
      id: Date.now().toString(),
      chatId: chatId,
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fromMe: true,
    }

    setMessages((prev) => [...prev, userMsg])
    socketService.sendMessage(chatId, currentUser.id, text)
  }

  if (!chat)
    return (
      <div className="flex flex-1 items-center justify-center">
        Chat not found
      </div>
    )

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatHeader
        name={chat.name}
        initials={chat.initials}
        online={chat.online}
      />

      <div
        ref={scrollRef}
        className="cachecito-ai-pattern scrollbar-hide flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-border/50 bg-card px-5 py-3 shadow-sm">
              <IconLoader2 className="h-4 w-4 animate-spin text-primary/40" />
            </div>
          </div>
        )}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  )
}
