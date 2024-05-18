interface EmailTemplateProps {
  href: string
}

export function EmailTemplate({ href }: EmailTemplateProps) {
  return (
    <div>
      <span>Clique <a href={href}>aqui</a> para confirmar o email.</span>
    </div>
  )
}