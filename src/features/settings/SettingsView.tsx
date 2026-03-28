import { Button } from "@/components/ui/button"
import { IconLogout } from "@tabler/icons-react"
import { settingsMenuItems } from "./data"
import { ListTile } from "@/components/shared/ListTile"
import { PageHeader } from "@/components/shared/PageHeader"
import { SectionHeader } from "@/components/shared/SectionHeader"

export function SettingsView() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <PageHeader title="Settings" />

      <div className="page-container mt-2">
        {/* Profile Card */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-2xl shadow-sm">
          <ListTile
            title="Joaquín Gamboa"
            subtitle="joaquin@cachecito.app"
            initials="JG"
            variant="settings"
            className="hover:bg-transparent active:bg-transparent"
          />
        </div>

        {/* Menu Sections */}
        {settingsMenuItems.map((section) => (
          <div key={section.section} className="flex flex-col gap-2 mt-3">
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
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out */}
        <Button
          variant="ghost"
          className="h-14 w-full justify-center gap-3 rounded-2xl text-[14px] font-bold text-destructive/70 transition-all hover:bg-destructive/5 hover:text-destructive active:scale-[0.98] border border-destructive/10"
        >
          <IconLogout size={18} stroke={2} />
          Cerrar sesión
        </Button>

        {/* Footer */}
        <div className="flex flex-col items-center gap-1.5 pt-4 pb-4">
          <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground/15 uppercase">
            Cachecito
          </span>
          <span className="text-[10px] font-medium text-muted-foreground/15">
            v0.0.1
          </span>
        </div>
      </div>
    </div>
  )
}
