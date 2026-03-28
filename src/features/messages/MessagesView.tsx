import { useNavigate } from "react-router-dom"
import { IconMessageOff, IconEdit } from "@tabler/icons-react"
import { mockChats } from "./data"
import { PageHeader } from "@/components/shared/PageHeader"
import { ListTile } from "@/components/shared/ListTile"
import { EmptyState } from "@/components/shared/EmptyState"

export function MessagesView() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <PageHeader
        title="Messages"
        searchPlaceholder="Search conversations..."
        actionIcon={IconEdit}
      />

      <div className="page-container mt-2">
        {mockChats.length > 0 ? (
          mockChats.map((chat) => (
            <ListTile
              key={chat.id}
              title={chat.name}
              subtitle={chat.lastMessage}
              time={chat.time}
              initials={chat.initials}
              online={chat.online}
              unreadCount={chat.unread}
              variant="chat"
              onClick={() => navigate(`/messages/${chat.id}`)}
            />
          ))
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
