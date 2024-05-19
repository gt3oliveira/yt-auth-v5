"use server"

import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/app/api/send/route"
import { generatePasswordResetToken } from "@/lib/tokens"

export const resetSchema = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values)

  if (!validateFields.success) { return { error: "Email inválido!" } }

  const { email } = validateFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) { return { error: "Email não existe!" } }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: "Email enviado!" }
}