import { Button } from "@/shared/ui/shadcn/button"
import { IconLogout } from "@tabler/icons-react"
import { settingsMenuItems } from "@/features/settings/data"
import { ListTile } from "@/shared/ui/ListTile"
import { PageHeader } from "@/shared/ui/PageHeader"
import { SectionHeader } from "@/shared/ui/SectionHeader"

export function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Settings" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="page-container mt-2 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-2xl shadow-sm">
            <ListTile
              title="Joaquín Gamboa"
              subtitle="joaquin@cachecito.app"
              initials="JG"
              variant="settings"
              className="hover:bg-transparent active:bg-transparent"
              isActionable={false}
            />
          </div>

          {/* Menu Sections */}
          <div className="flex flex-col gap-5">
            {settingsMenuItems.map((section) => (
              <div key={section.section} className="flex flex-col gap-2">
                <SectionHeader label={section.section} />
                <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-2xl shadow-sm">
                  {section.items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <div className="mx-4 h-px bg-border/40" />}
                      <ListTile
                        title={item.label}
                        subtitle={item.description}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        iconBg={item.iconBg}
                        variant="settings"
                        onClick={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sign Out */}
          <Button
            variant="ghost"
            className="h-14 w-full justify-center gap-3 rounded-2xl text-[14px] font-bold text-destructive/70 transition-all hover:bg-destructive/5 hover:text-destructive border border-destructive/10"
          >
            <IconLogout size={18} stroke={2} />
            Sign Out
          </Button>

          {/* Footer */}
          <div className="flex flex-col items-center gap-1.5 pt-2 pb-8">
            <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground/15 uppercase">
              Cachecito
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/15">
              v0.0.1
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
