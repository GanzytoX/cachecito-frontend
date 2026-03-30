export interface Notification {
  id: string
  type: "transfer_in" | "transfer_out" | "friend_request" | "security" | "promo"
  title: string
  description: string
  time: string
  read: boolean
}
