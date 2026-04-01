import { browserStorage } from "@/shared/lib/browser-storage"

export const storage = {
  getUser: <T>(key: string): T | null => {
    return browserStorage.get(key)
  },
  setUser: <T>(key: string, value: T): void => {
    browserStorage.set(key, value)
  },
  // Add other generic helper if needed
}
