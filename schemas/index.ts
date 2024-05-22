import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(1, {
    message: "Preencha o nome",
  })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  email: z.optional(z.string().email({
    message: "Preencha o email",
  })),
  password: z.optional(z.string().min(6, {
    message: "Deve conter no mínimo 6 caracteres",
  })),
  newPassword: z.optional(z.string().min(6, {
    message: "Deve conter no mínimo 6 caracteres",
  })),
}).refine((data) => {
  if (!data.newPassword) {
    return false
  }

  return true
}, {
  message: "Confirme a senha",
  path: ["newPassword"],
}).refine((data) => {
  if (!data.password) {
    return false
  }

  return true
}, {
  message: "Informe a senha",
  path: ["password"],
}).refine((data) => {
  if ((data.newPassword && data.password) && (data.password !== data.newPassword)) {
    return false
  }

  return true
}, {
  message: "As senhas devem ser iguais",
  path: ["newPassword"],
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Deve conter no mínimo 6 caracteres",
  })
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Preencha o email"
  })
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Preencha o email"
  }),
  password: z.string().min(1, {
    message: "Informe a senha"
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Preencha o email"
  }),
  password: z.string().min(6, {
    message: "Deve conter no mínimo 6 caracteres",
  }),
  name: z.string().min(1, {
    message: "Preencha o nome",
  })
})