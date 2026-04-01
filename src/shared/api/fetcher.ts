import type { FetchError } from "./fetcher.types"

export const fetcher = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    const error: FetchError = new Error(
      "An error occurred while fetching the data."
    )
    // Attach extra info to the error object.
    const info = await response.json().catch(() => ({}))
    error.status = response.status
    error.info = info
    throw error
  }

  return response.json()
}
