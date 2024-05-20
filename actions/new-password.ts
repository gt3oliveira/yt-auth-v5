"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { NewPasswordSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Token inválido!" }
  }

  const validateFields = NewPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Dados inválidos!" }
  }

  const { password } = validateFields.data
  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "Token inválido!" }
  }

  const hasExpired = new Date() > new Date(existingToken.expires)

  if (hasExpired) {
    return { error: "Token expirado!" }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email não existe!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  })

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return { success: "Senha alterada com sucesso!" }
}