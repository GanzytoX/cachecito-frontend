export interface Chat {
  id: string | number
  name: string
  initials: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

export interface Message {
  id: string | number
  chatId: string | number
  text: string
  time: string
  fromMe: boolean
  type?: "user" | "system"
}
