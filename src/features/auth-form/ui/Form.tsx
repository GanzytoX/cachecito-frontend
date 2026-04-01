import { useState } from "react"
import {
  IconLoader2,
  IconArrowRight,
  IconSparkles,
  IconUser,
  IconRobot,
} from "@tabler/icons-react"
import { registerUser } from "@shared/api/api"
import { userStorage, type User } from "@entities/user"

interface AuthFormProps {
  onSuccess: (userData: User) => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [regName, setRegName] = useState("")
  const [regPersona, setRegPersona] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regName.trim() || !regPersona.trim()) return

    setIsRegistering(true)
    try {
      const user = await registerUser(regName, regPersona)
      const userData = { id: user.id, name: regName, aiPersona: regPersona }
      userStorage.saveUser(userData)
      onSuccess(userData)
    } catch (error) {
      console.error("Registration error:", error)
      alert("Error al registrar usuario. Revisa la conexión con el servidor.")
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="flex w-full flex-col duration-500 animate-in fade-in slide-in-from-bottom-2">
      <div className="mb-14 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-2xl shadow-primary/5 transition-all duration-700 animate-in zoom-in">
          <IconSparkles size={30} stroke={1.5} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          <span className="bg-linear-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Cachecito AI
          </span>
        </h1>
        <div className="mt-2 h-px w-8 bg-primary/20" />
        <p className="mt-3 max-w-[260px] text-[12px] leading-relaxed font-semibold text-muted-foreground/35">
          Diseña la mentalidad táctica de tu negociador inteligente.
        </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="mx-auto w-full max-w-sm space-y-6"
      >
        <div className="space-y-4">
          {/* Consistent Identity Field */}
          <div className="group space-y-2">
            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground/30 uppercase transition-colors group-focus-within:text-primary">
              Identidad del Agente
            </label>
            <div className="relative">
              <IconUser
                size={18}
                stroke={2}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground/20 transition-colors group-focus-within:text-primary"
              />
              <input
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="h-14 w-full rounded-2xl border border-border/50 bg-card px-12 text-[14px] font-semibold shadow-none transition-all outline-none placeholder:font-medium placeholder:text-muted-foreground/15 focus:border-primary/40 focus:ring-4 focus:ring-primary/5"
                placeholder="Nombre del Agente"
              />
            </div>
          </div>

          {/* Consistent Persona Field */}
          <div className="group space-y-2">
            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground/30 uppercase transition-colors group-focus-within:text-primary">
              Personalidad (Cerebro)
            </label>
            <div className="relative">
              <IconRobot
                size={18}
                stroke={2}
                className="absolute top-5 left-4 text-muted-foreground/20 transition-colors group-focus-within:text-primary"
              />
              <textarea
                required
                rows={4}
                value={regPersona}
                onChange={(e) => setRegPersona(e.target.value)}
                className="w-full resize-none rounded-2xl border border-border/50 bg-card p-5 pl-12 text-[13.5px] leading-relaxed font-semibold shadow-none transition-all outline-none placeholder:font-medium placeholder:text-muted-foreground/15 focus:border-primary/40 focus:ring-4 focus:ring-primary/5"
                placeholder="Describe cómo negocia tu IA..."
              />
            </div>
          </div>
        </div>

        {/* Action Tile */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isRegistering}
            className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-widest text-primary-foreground transition-all hover:opacity-95 active:scale-95 disabled:opacity-50"
          >
            {isRegistering ? (
              <IconLoader2 className="mx-auto animate-spin" size={20} />
            ) : (
              <>
                <span className="uppercase">Confirmar Registro</span>
                <IconArrowRight
                  size={18}
                  stroke={3}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
