export interface Appointment {
  id: number
  conversationId: number
  initiatorId: number
  receiverId: number
  date: string // "YYYY-MM-DD"
  time: string // "HH:MM"
  location: string | null
  subject: string
  status: "PENDING_CONFIRMATION" | "CONFIRMED" | "REJECTED"
}

export interface Conversation {
  id: number
  initiatorId: number
  receiverId: number
  status: "OPEN" | "CLOSED" | "AGREED"
  history: unknown[] // Array de objetos JSON (lo que negocia la IA)
  createdAt: string
}

export interface User {
  id: number
  name: string
  email: string
  agent?: {
    id: number
  }
}

export interface RequestResponse {
  // Define this based on what the API actually returns
  // For now, an opaque object that includes the proposal
  [key: string]: unknown
}
