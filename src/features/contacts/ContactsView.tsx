import { IconUserPlus, IconUserOff } from "@tabler/icons-react"
import { mockContacts } from "./data"
import type { Contact } from "./types"
import { PageHeader } from "@/components/shared/PageHeader"
import { ListTile } from "@/components/shared/ListTile"
import { EmptyState } from "@/components/shared/EmptyState"
import { SectionHeader } from "@/components/shared/SectionHeader"

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
      <PageHeader
        title="Contacts"
        searchPlaceholder="Search people..."
        actionIcon={IconUserPlus}
      />

      <div className="page-container mt-4">
        {mockContacts.length > 0 ? (
          <div className="flex flex-col gap-6">
            {sortedLetters.map((letter) => (
              <div key={letter} className="flex flex-col">
                <SectionHeader label={letter} />
                <div className="flex flex-col gap-0.5">
                  {grouped[letter].map((contact) => (
                    <ListTile
                      key={contact.id}
                      title={contact.name}
                      subtitle={contact.status}
                      initials={contact.initials}
                      online={contact.online}
                      variant="contact"
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
  )
}
