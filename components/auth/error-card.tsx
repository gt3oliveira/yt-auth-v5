import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Ops! Algo de errado aconteceu."
      backButtonHref="/auth/login"
      backButtonLabel="Voltar ao login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
