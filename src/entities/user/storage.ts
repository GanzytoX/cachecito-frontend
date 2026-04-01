import { browserStorage } from "@/shared/lib/browser-storage"
import type { User } from "./types"

const USER_KEY = "cachecito_ai_user"

export const userStorage = {
  getUser: (): User | null => browserStorage.get(USER_KEY),
  saveUser: (user: User) => browserStorage.set(USER_KEY, user),
}
