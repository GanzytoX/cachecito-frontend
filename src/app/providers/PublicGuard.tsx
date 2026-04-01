import { Navigate, Outlet } from "react-router-dom"
import { userStorage } from "@entities/user"

export function PublicGuard() {
  const user = userStorage.getUser()

  if (user) {
    return <Navigate to="/messages" replace />
  }

  return <Outlet />
}
