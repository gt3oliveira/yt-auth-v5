"use server"
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens'
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from '@/app/api/send/route'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { db } from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) { return { error: "Dados inválidos!" } }

  const { email, password, code } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Este email não existe!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Confirmação de email enviado!" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: "Código inválido!" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido!" }
      }

      const hasExpired = new Date() > new Date(twoFactorToken.expires)

      if (hasExpired) {
        return { error: "Código expirado!" }
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      )

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email, password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Usuário inválido!" }
        default:
          return { error: "Ops! Algo deu errado..." }
      }
    }

    throw error
  }
}