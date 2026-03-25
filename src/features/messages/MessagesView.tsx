import { IconMessageOff } from "@tabler/icons-react"
import { mockChats } from "./data"
import { PageHeader } from "@/components/shared/PageHeader"
import { ListTile } from "@/components/shared/ListTile"
import { EmptyState } from "@/components/shared/EmptyState"

export function MessagesView() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Messages"
        searchPlaceholder="Search conversations..."
      />

      <div className="page-container mt-1">
        {mockChats.length > 0 ? (
          <div className="flex flex-col gap-1 pb-52">
            {mockChats.map((chat) => (
              <ListTile
                key={chat.id}
                title={chat.name}
                subtitle={chat.lastMessage}
                time={chat.time}
                initials={chat.initials}
                online={chat.online}
                unreadCount={chat.unread}
                variant="chat"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={IconMessageOff}
            title="Quiet in here..."
            description="Start a new conversation and let the magic begin."
          />
        )}
      </div>
    </div>
  )
}
