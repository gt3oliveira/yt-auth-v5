import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Confirmação de email',
      react: EmailTemplate({ href: confirmLink })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}