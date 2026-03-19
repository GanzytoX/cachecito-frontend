import { IconSearch, IconMessageOff } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { mockChats } from "./data"

export function MessagesView() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/50 px-6 py-6 backdrop-blur-3xl border-b border-white/5">
        <h1 className="text-foreground/90">Messages</h1>
        <div className="relative mt-4 group">
          <IconSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10" />
          <Input
            placeholder="Search conversations..."
            className="bg-card border-none h-14 rounded-2xl pl-12 backdrop-blur-2xl focus-visible:ring-primary/20 transition-all shadow-none placeholder:text-muted-foreground/40 font-medium"
          />
        </div>
      </header>

      <div className="px-4">
        {mockChats.length > 0 ? (
          <div className="flex flex-col gap-1 pb-52">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-left transition-colors active:bg-white/5"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/10">
                    <span className="text-sm font-semibold tracking-tight">
                      {chat.initials}
                    </span>
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[14px] tracking-tight ${chat.unread > 0 ? "font-bold" : "font-medium"}`}
                    >
                      {chat.name}
                    </span>
                    <span
                      className={`text-[11px] ${chat.unread > 0 ? "font-semibold text-primary" : "text-muted-foreground/40"}`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`truncate text-[13px] ${chat.unread > 0 ? "font-medium text-foreground/70" : "text-muted-foreground/50"}`}
                    >
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center px-8">
            <div className="p-10 rounded-2xl bg-primary/5 mb-8 backdrop-blur-2xl border border-white/10 shadow-sm">
              <IconMessageOff
                size={56}
                className="text-primary/20"
                stroke={1.2}
              />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground/80">
              Quiet in here...
            </h3>
            <p className="text-sm text-muted-foreground/50 mt-3 max-w-[220px] leading-relaxed">
              Start a new conversation and let the magic begin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
