import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'ADMIN <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Redefinir senha',
      react: EmailTemplate({
        href: resetLink,
        text: 'redefinir senha'
      })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'ADMIN <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Confirmação de email',
      react: EmailTemplate({
        href: confirmLink,
        text: 'confirmação de email'
      })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}