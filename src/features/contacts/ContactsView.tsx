import { IconSearch, IconUserPlus, IconUserOff } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockContacts } from "./data"
import type { Contact } from "./types"

// Group contacts alphabetically
const grouped = mockContacts.reduce(
  (acc, contact) => {
    const letter = contact.name[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(contact)
    return acc
  },
  {} as Record<string, Contact[]>
)

const sortedLetters = Object.keys(grouped).sort()

export function ContactsView() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/50 px-6 py-6 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground/90">Contacts</h1>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-xl h-10 w-10 bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all active:scale-90"
          >
            <IconUserPlus size={20} stroke={2} />
          </Button>
        </div>
        <div className="relative mt-4 group">
          <IconSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10" />
          <Input
            placeholder="Search people..."
            className="bg-card border-none h-14 rounded-2xl pl-12 backdrop-blur-2xl focus-visible:ring-primary/20 transition-all shadow-none placeholder:text-muted-foreground/40 font-medium"
          />
        </div>
      </header>

      <div className="px-4">
        {mockContacts.length > 0 ? (
          <div className="flex flex-col gap-4 pb-52">
            {sortedLetters.map((letter) => (
              <div key={letter} className="flex flex-col">
                <span className="mb-1 px-3 text-[11px] font-semibold tracking-[0.15em] text-muted-foreground/30 uppercase">
                  {letter}
                </span>
                <div className="flex flex-col">
                  {grouped[letter].map((contact) => (
                    <button
                      key={contact.id}
                      className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-left transition-colors active:bg-white/5"
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/10">
                          <span className="text-sm font-semibold tracking-tight">
                            {contact.initials}
                          </span>
                        </div>
                        {contact.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-0.5">
                        <span className="text-[14px] font-medium tracking-tight">
                          {contact.name}
                        </span>
                        <span className="text-[12px] text-muted-foreground/50">
                          {contact.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center px-8">
            <div className="p-10 rounded-2xl bg-primary/5 mb-8 backdrop-blur-2xl border border-white/10 shadow-sm">
              <IconUserOff
                size={56}
                className="text-primary/20"
                stroke={1.2}
              />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground/80">
              All alone?
            </h3>
            <p className="text-sm text-muted-foreground/50 mt-3 max-w-[220px] leading-relaxed">
              Add your friends to start sharing moments.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
