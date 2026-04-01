import { io, Socket } from "socket.io-client"

const SOCKET_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://157.254.174.112:3000"
).replace(/\/$/, "")

class SocketService {
  private socket: Socket | null = null

  connect() {
    if (!this.socket) {
      console.log(`📡 Connecting to WebSocket at ${SOCKET_URL}...`)
      this.socket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        transports: ["websocket", "polling"], // Allow polling as fallback
        timeout: 10000,
      })

      this.socket.on("connect", () => {
        console.log("✅ WebSocket Connected! (ID:", this.socket?.id, ")")
      })

      this.socket.on("disconnect", (reason: string) => {
        console.log("❌ WebSocket Disconnected:", reason)
      })

      this.socket.on("connect_error", (error: Error) => {
        console.log("⚠️ Connection error:", error.message)
      })

      // Handle reconnect
      this.socket.io.on("reconnect_attempt", (attempt: number) => {
        console.log(`🔄 Reconnection attempt #${attempt}...`)
      })
    }
    return this.socket
  }

  getSocket() {
    if (!this.socket) {
      return this.connect()
    }
    return this.socket
  }

  joinChat(chatId: string | number) {
    const socket = this.getSocket()
    const idStr = String(chatId)
    if (socket.connected) {
      console.log(`🔌 Joining chat room: ${idStr}`)
      socket.emit("joinChat", idStr)
    } else {
      socket.once("connect", () => {
        console.log(`🔌 Joining chat room (deferred): ${idStr}`)
        socket.emit("joinChat", idStr)
      })
    }
  }

  sendMessage(
    chatId: string | number,
    userId: string | number,
    content: string
  ) {
    const socket = this.getSocket()
    const payload = {
      chatId: String(chatId),
      userId: String(userId),
      content,
    }
    console.log("📤 Sending message:", payload)
    socket.emit("sendMessage", payload)
  }

  onNewMessage(
    callback: (data: {
      id?: string | number
      content: string | unknown
      userId: string | number
    }) => void
  ) {
    const socket = this.getSocket()
    socket.off("newMessage") // Avoid duplicate listeners
    socket.on("newMessage", callback)
  }

  onAgentStatus(callback: (data: { status: string }) => void) {
    const socket = this.getSocket()
    socket.off("agentStatus")
    socket.on("agentStatus", callback)
  }

  onManifestUpdated(
    callback: (data: { summary?: string; [key: string]: unknown }) => void
  ) {
    const socket = this.getSocket()
    socket.off("manifestUpdated")
    socket.on("manifestUpdated", callback)
  }

  confirmAppointment(appointmentId: number, status: "CONFIRMED" | "REJECTED") {
    const socket = this.getSocket()
    socket.emit("confirmAppointment", { appointmentId, status })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export const socketService = new SocketService()
