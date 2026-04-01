import { useNavigate } from "react-router-dom"
import { IconArrowLeft } from "@tabler/icons-react"
import { Avatar } from "@shared/ui"

interface ChatHeaderProps {
  name: string
  initials: string
  online: boolean
}

export function ChatHeader({ name, initials, online }: ChatHeaderProps) {
  const navigate = useNavigate()
  
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/50 px-4 py-4 backdrop-blur-2xl transition-all duration-300">
      <button
        onClick={() => navigate("/messages")}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground/60 transition-all hover:bg-foreground/5 hover:text-foreground active:scale-90"
      >
        <IconArrowLeft size={20} stroke={2} />
      </button>

      <Avatar initials={initials} online={online} size="sm" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="truncate text-[14px] font-bold tracking-tight text-foreground/90">
          {name}
        </span>
        <span className="text-[11px] text-muted-foreground/40">
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </header>
  )
}
