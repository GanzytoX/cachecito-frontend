import { useNavigate } from "react-router-dom"
import { AuthForm } from "@features/auth-form"

export function RegistrationPage() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/messages")
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <AuthForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
