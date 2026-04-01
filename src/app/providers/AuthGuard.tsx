import { Navigate, Outlet } from "react-router-dom"
import { userStorage } from "@entities/user"

export function AuthGuard() {
  const user = userStorage.getUser()

  if (!user) {
    return <Navigate to="/registration" replace />
  }

  return <Outlet />
}
