import { browserStorage } from "@/shared/lib/browser-storage"
import type { Message, Chat } from "./types"

const CHATS_KEY = "cachecito_chats"
const MESSAGES_KEY = "cachecito_messages"

export const messageStorage = {
  getChats: (): Chat[] => browserStorage.get(CHATS_KEY) || [],

  saveChat: (chat: Chat) => {
    const chats = messageStorage.getChats()
    const index = chats.findIndex((c) => c.id === chat.id)
    if (index > -1) {
      chats[index] = { ...chats[index], ...chat }
    } else {
      chats.unshift(chat)
    }
    browserStorage.set(CHATS_KEY, chats)
  },

  getMessages: (chatId: string): Message[] =>
    browserStorage.get(`${MESSAGES_KEY}_${chatId}`) || [],

  saveMessages: (chatId: string, messages: Message[], chatContext?: Chat) => {
    const hasUserMessages = messages.some((m) => m.fromMe)
    if (!hasUserMessages) return

    browserStorage.set(`${MESSAGES_KEY}_${chatId}`, messages)

    const chats = messageStorage.getChats()
    let chat = chats.find((c) => c.id === chatId)

    if (!chat && chatContext) {
      chat = { ...chatContext }
    }

    if (chat && messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      chat.lastMessage = lastMsg.text
      chat.time = lastMsg.time
      messageStorage.saveChat(chat)
    }
  },
}
