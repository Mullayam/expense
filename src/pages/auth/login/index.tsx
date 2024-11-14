import { useAppSelector } from "@/hooks/use-store";
import { LoginForm } from "./_components/login-form"
import { Navigate } from "react-router-dom";
export function Login() {
  const { user: authUser } = useAppSelector(x => x.auth);
  if (authUser) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
