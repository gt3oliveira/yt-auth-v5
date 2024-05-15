"use client"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface LoginButtonProps {
  children: ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export function LoginButton({
  children, asChild, mode = 'redirect'
}: LoginButtonProps) {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === 'modal') {
    return (
      <span>
        TODO: implament modal
      </span>
    )
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
