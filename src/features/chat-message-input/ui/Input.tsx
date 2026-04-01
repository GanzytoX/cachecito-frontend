import { useState, useRef, useEffect } from "react"
import { IconPlus, IconPhoto, IconPaperclip, IconSend2, IconMicrophone } from "@tabler/icons-react"
import { cn } from "@shared/lib/utils"

interface MessageInputProps {
  onSend: (text: string) => void
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [newMessage, setNewMessage] = useState("")
  const [attachMenuOpen, setAttachMenuOpen] = useState(false)
  const attachRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!newMessage.trim()) return
    onSend(newMessage)
    setNewMessage("")
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(event.target as Node)) {
        setAttachMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="border-t border-border bg-background/50 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-2xl">
      <div className="relative flex items-end gap-2">
        <div ref={attachRef} className="relative">
          {attachMenuOpen && (
            <div className="absolute bottom-full left-0 z-50 mb-4 flex w-48 flex-col gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-2xl duration-200 animate-in fade-in slide-in-from-bottom-2">
              <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-foreground/70 transition-all hover:bg-foreground/5 active:scale-95">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IconPhoto size={18} stroke={1.5} />
                </div>
                <span>Upload Image</span>
              </button>
              <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-foreground/70 transition-all hover:bg-foreground/5 active:scale-95">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IconPaperclip size={18} stroke={1.5} />
                </div>
                <span>Attach File</span>
              </button>
            </div>
          )}
          <button
            onClick={() => setAttachMenuOpen(!attachMenuOpen)}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
              attachMenuOpen
                ? "rotate-45 bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground/40"
            )}
          >
            <IconPlus size={20} stroke={2} />
          </button>
        </div>

        <div className="relative flex-1">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="h-11 w-full rounded-2xl border border-border/50 bg-card/50 px-4 text-[13.5px] transition-all outline-none focus:border-primary/30"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </div>
        <button
          onClick={handleSend}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-90",
            newMessage.trim()
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-muted/50 text-muted-foreground/40"
          )}
        >
          {newMessage.trim() ? (
            <IconSend2 size={18} stroke={2.2} />
          ) : (
            <IconMicrophone size={20} stroke={2} />
          )}
        </button>
      </div>
    </div>
  )
}
