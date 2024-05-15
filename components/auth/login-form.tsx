import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'

export function LoginForm() {
  return (
    <CardWrapper
      headerLabel='Bem-vindo(a) outra vez.'
      backButtonLabel='Já possui conta?'
      backButtonHref='/auth/register'
      showSocial
    >
      LoginForm
    </CardWrapper>
  )
}
