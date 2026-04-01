import { useLocation, useNavigate } from "react-router-dom"
import {
  IconMessage2,
  IconUsers,
  IconBell,
  IconSettings,
} from "@tabler/icons-react"
import { cn } from "@/shared/lib/utils"

const navItems = [
  { path: "/messages", icon: IconMessage2 },
  { path: "/contacts", icon: IconUsers },
  { path: "/notifications", icon: IconBell },
  { path: "/settings", icon: IconSettings },
]

export function BottomNav() {
  // trigger HMR
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="glass-nav">
      <div className="flex h-16 items-center px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "relative mx-1 flex h-12 flex-1 items-center justify-center rounded-2xl transition-all duration-300 outline-none",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/40 hover:bg-foreground/5 hover:text-foreground/70"
              )}
            >
              <item.icon
                size={22}
                stroke={isActive ? 2.2 : 1.5}
                className={cn(
                  "transition-all duration-300",
                  isActive && "scale-110"
                )}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
