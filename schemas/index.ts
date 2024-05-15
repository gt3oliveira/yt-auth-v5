import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Preencha o email"
  }),
  password: z.string().min(1, {
    message: "Informe a senha"
  })
})