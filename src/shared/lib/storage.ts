import type { Message, Chat } from "@/entities/message/model/types"

const CHATS_KEY = "cachecito_chats"
const MESSAGES_KEY = "cachecito_messages"
const USER_KEY = "cachecito_user"

export const storage = {
  getUser: (): { id: string, name: string, aiPersona: string } | null => {
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  },

  saveUser: (user: { id: string, name: string, aiPersona: string }) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getChats: (): Chat[] => {
    const data = localStorage.getItem(CHATS_KEY)
    return data ? JSON.parse(data) : []
  },

  saveChat: (chat: Chat) => {
    const chats = storage.getChats()
    const index = chats.findIndex((c) => c.id === chat.id)
    if (index > -1) {
      // Preserve existing fields if not provided in the new chat object
      chats[index] = { ...chats[index], ...chat }
    } else {
      chats.unshift(chat)
    }
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  },

  getMessages: (chatId: string): Message[] => {
    const data = localStorage.getItem(`${MESSAGES_KEY}_${chatId}`)
    return data ? JSON.parse(data) : []
  },

  saveMessages: (chatId: string, messages: Message[], chatContext?: Chat) => {
    // Check if the user has sent at least one message
    const hasUserMessages = messages.some(m => m.fromMe)
    
    // If no user messages, we don't save anything at all (neither the list entry nor the messages)
    if (!hasUserMessages) return

    localStorage.setItem(`${MESSAGES_KEY}_${chatId}`, JSON.stringify(messages))

    // Ensure the chat exists in the list and update preview
    const chats = storage.getChats()
    let chat = chats.find(c => c.id === chatId)
    
    if (!chat && chatContext) {
      chat = { ...chatContext }
    }
    
    if (chat && messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      chat.lastMessage = lastMsg.text
      chat.time = lastMsg.time
      storage.saveChat(chat)
    }
  }
}
