"use client"

import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'

import { CardWrapper } from "./card-wrapper"
import { newVerification } from '@/actions/new-verification'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'


export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token inválido!")
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Algo deu errado!")
      })
  }, [token, success, error])

  useEffect(() => {
    if (token) {
      onSubmit()
    }
  }, [token, onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirme sua verificação"
      backButtonHref="/auth/login"
      backButtonLabel="Voltar ao login"
    >
      <div className="w-full flex justify-center items-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
}
