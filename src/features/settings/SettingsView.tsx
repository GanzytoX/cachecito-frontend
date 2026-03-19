import { Button } from "@/components/ui/button"
import { IconChevronRight, IconLogout } from "@tabler/icons-react"
import { settingsMenuItems } from "./data"

export function SettingsView() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 px-6 pt-8 pb-52">
        {/* Profile Card */}
        <button className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-card/60 p-5 text-left backdrop-blur-2xl transition-all active:scale-[0.98]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/20">
            <span className="text-lg font-bold tracking-tight">JG</span>
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-semibold tracking-tight">
              Joaquín Gamboa
            </span>
            <span className="text-[12px] text-muted-foreground/50">
              joaquin@cachecito.app
            </span>
          </div>
          <IconChevronRight
            size={16}
            className="text-muted-foreground/20 transition-transform group-hover:translate-x-0.5"
          />
        </button>

        {/* Menu Sections */}
        {settingsMenuItems.map((section) => (
          <div key={section.section} className="flex flex-col gap-2">
            <span className="px-1 text-[11px] font-semibold tracking-[0.15em] text-muted-foreground/35 uppercase">
              {section.section}
            </span>
            <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card/40 backdrop-blur-2xl">
              {section.items.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <div className="mx-17 h-px bg-white/5" />}
                  <button className="group flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors active:bg-white/5">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} transition-transform duration-200 group-active:scale-95`}
                    >
                      <item.icon size={18} stroke={1.6} />
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[14px] font-medium tracking-tight">
                        {item.label}
                      </span>
                      <span className="text-[12px] text-muted-foreground/50">
                        {item.description}
                      </span>
                    </div>
                    <IconChevronRight
                      size={15}
                      className="text-muted-foreground/20"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out */}
        <Button
          variant="ghost"
          className="h-12 w-full justify-center gap-2.5 rounded-xl text-[14px] font-medium text-destructive/70 transition-all hover:bg-destructive/5 hover:text-destructive active:scale-[0.98]"
        >
          <IconLogout size={17} stroke={1.6} />
          Cerrar sesión
        </Button>

        {/* Footer */}
        <div className="flex flex-col items-center gap-1 pt-2 pb-4">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground/15 uppercase">
            Cachecito
          </span>
          <span className="text-[10px] text-muted-foreground/15">v0.0.1</span>
        </div>
      </div>
    </div>
  )
}
