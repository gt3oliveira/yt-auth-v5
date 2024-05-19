"use server"

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: "Token não encontrado!" }
  }

  const hasExpired = new Date() > new Date(existingToken.expires)

  if (hasExpired) {
    return { error: "Token expirado!" }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email não existe!" }
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return { success: "Email verificado com sucesso!" }
}
