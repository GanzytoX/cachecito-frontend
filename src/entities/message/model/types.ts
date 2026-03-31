export interface Chat {
  id: string
  name: string
  initials: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

export interface Message {
  id: string
  chatId: string
  text: string
  time: string
  fromMe: boolean
  type?: 'user' | 'system'
}
