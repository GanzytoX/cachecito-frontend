import type { Appointment, RequestResponse } from "@/shared/lib/types"

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://7jxvqht3-4000.usw3.devtunnels.ms"
export const CURRENT_HUMAN_ID = 1

/**
 * Sends a text or voice command to the agent.
 * POST /request
 */
export async function sendRequest(textCommand: string): Promise<RequestResponse> {
  const response = await fetch(`${BASE_URL}/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      humanId: CURRENT_HUMAN_ID,
      textCommand,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(errorData.message || `Error sending request: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Gets the list of appointments pending confirmation.
 * GET /notifications?humanId={id}
 */
export async function getNotifications(): Promise<Appointment[]> {
  const response = await fetch(`${BASE_URL}/notifications?humanId=${CURRENT_HUMAN_ID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching notifications: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Confirms or rejects an appointment.
 * PATCH /confirm
 */
export async function confirmAppointment(
  appointmentId: number,
  status: "CONFIRMED" | "REJECTED"
): Promise<{ success: boolean }> {
  const response = await fetch(`${BASE_URL}/confirm`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appointmentId,
      status,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error confirming appointment: ${response.statusText}`)
  }

  return response.json()
}
