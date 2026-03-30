import { IconUserPlus, IconUserOff, IconSparkles } from "@tabler/icons-react"
import { mockContacts } from "@/features/contacts/data"
import type { Contact } from "@/entities/contact/model/types"
import { PageHeader } from "@/shared/ui/PageHeader"
import { ListTile } from "@/shared/ui/ListTile"
import { EmptyState } from "@/shared/ui/EmptyState"
import { SectionHeader } from "@/shared/ui/SectionHeader"

export function ContactsPage() {
  const cachecito = mockContacts.find(c => c.id === "agent")
  const others = mockContacts.filter(c => c.id !== "agent")

  // Group others alphabetically
  const grouped = others.reduce(
    (acc, contact) => {
      const letter = contact.name[0].toUpperCase()
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(contact)
      return acc
    },
    {} as Record<string, Contact[]>
  )

  const sortedLetters = Object.keys(grouped).sort()

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Contacts"
        searchPlaceholder="Search people..."
        actionIcon={IconUserPlus}
      />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="page-container mt-2">
          {mockContacts.length > 0 ? (
            <div className="flex flex-col gap-6">
              {/* Specialized AI Section */}
              {cachecito && (
                <div className="flex flex-col gap-2">
                  <SectionHeader label="AI Assistant" />
                  <ListTile
                    title={cachecito.name}
                    subtitle={cachecito.status}
                    initials={cachecito.initials}
                    online={cachecito.online}
                    variant="chat"
                    trailing={
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <IconSparkles size={16} />
                      </div>
                    }
                  />
                </div>
              )}

              {/* Alphabetical Sections */}
              {sortedLetters.map((letter) => (
                <div key={letter} className="flex flex-col gap-2">
                  <SectionHeader label={letter} />
                  <div className="flex flex-col gap-2.5">
                    {grouped[letter].map((contact: Contact) => (
                      <ListTile
                        key={contact.id}
                        title={contact.name}
                        subtitle={contact.status}
                        initials={contact.initials}
                        online={contact.online}
                        variant="chat"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={IconUserOff}
              title="All alone?"
              description="Add your friends to start sharing moments."
            />
          )}
        </div>
      </div>
    </div>
  )
}
