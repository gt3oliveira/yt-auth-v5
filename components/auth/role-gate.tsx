"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { FormError } from "../form-error"

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return <FormError message="Você não tem permissão para acessar esta página!" />
  }

  return (
    <>{children}</>
  )
}