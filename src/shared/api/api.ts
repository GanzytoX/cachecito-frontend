import type { Appointment } from "@/shared/lib/types"

export const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://157.254.174.112:3000").replace(/\/$/, "")
export const CURRENT_HUMAN_ID = 1

/**
 * 1. Register User (POST /api/users)
 * Before chatting, each user must exist in the DB.
 */
export async function registerUser(name: string, aiPersona: string): Promise<{ id: string }> {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, aiPersona }),
  })
  if (!response.ok) throw new Error("Failed to register user")
  return response.json()
}

/**
 * 2. List Users (GET /api/users)
 * To choose a counterpart for negotiation.
 */
export async function listUsers(): Promise<any[]> {
  const response = await fetch(`${BASE_URL}/api/users`)
  if (!response.ok) throw new Error("Failed to list users")
  return response.json()
}

/**
 * 3. Create or Open a Chat (POST /api/chats)
 * Requires IDs of two users.
 */
export async function createChat(userIds: string[]): Promise<{ id: string }> {
  const response = await fetch(`${BASE_URL}/api/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds }),
  })
  if (!response.ok) throw new Error("Failed to create chat")
  return response.json()
}

/**
 * 5. Project Manifest (POST /api/chats/:id/manifest)
 * Uploads initial document.
 */
export async function uploadManifest(chatId: string, content: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/api/chats/${chatId}/manifest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  if (!response.ok) throw new Error("Failed to upload manifest")
  return response.json()
}

/**
 * NOTE: Legacy or for compatibility - checks for notifications
 */
export async function getNotifications(humanId: number): Promise<Appointment[]> {
  const response = await fetch(`${BASE_URL}/notifications?humanId=${humanId}`)
  if (!response.ok) throw new Error("Failed to fetch notifications")
  return response.json()
}
