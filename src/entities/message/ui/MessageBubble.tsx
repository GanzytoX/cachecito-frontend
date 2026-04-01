import { IconCircleCheck } from "@tabler/icons-react"
import { cn } from "@shared/lib/utils"
import type { Message } from "../types"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isSystem = message.type === "system"

  if (isSystem) {
    return (
      <div
        className="my-4 flex justify-center duration-500 animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-600 shadow-sm">
          <IconCircleCheck size={16} stroke={2.5} />
          <span className="text-[11px] font-bold tracking-wider uppercase">
            {message.text}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("flex", message.fromMe ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-1",
          message.fromMe
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border/50 bg-card text-foreground/80"
        )}
      >
        <p className="text-[13.5px] leading-relaxed">{message.text}</p>
        <span
          className={cn(
            "mt-1 block text-right text-[10px]",
            message.fromMe
              ? "text-primary-foreground/50"
              : "text-muted-foreground/30"
          )}
        >
          {message.time}
        </span>
      </div>
    </div>
  )
}
