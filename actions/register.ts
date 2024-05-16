"use server"
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) { return { error: "Dados inválidos!" } }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Este email já está cadastrado!" }
  }

  await db.user.create({
    data: {
      name, email, password: hashedPassword
    }
  })

  return { success: "Usuário cadastrado!" }
}