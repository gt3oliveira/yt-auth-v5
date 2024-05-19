import * as z from 'zod'

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
  })
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