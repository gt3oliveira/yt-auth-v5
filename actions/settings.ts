"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/app/api/send/route"

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: "Usuário não autenticado!" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Usuário não encontrado!" }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email já está cadastrado!" }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Confirmação de email enviado!" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )

    if (!passwordMatch) {
      return { error: "Senha inválida!" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      ...values
    }
  })

  return { success: "Configurações alteradas!" }

}
