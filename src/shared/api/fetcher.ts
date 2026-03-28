export const fetcher = async (url: string) => {
  const response = await fetch(url)
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    const info = await response.json().catch(() => ({}))
    ;(error as any).status = response.status
    ;(error as any).info = info
    throw error
  }

  return response.json()
}
