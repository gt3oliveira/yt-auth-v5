interface EmailTemplateProps {
  href: string
  text: string
}

export function EmailTemplate({ href, text }: EmailTemplateProps) {
  return (
    <div>
      <span>Clique <a href={href}>aqui</a> para {text}.</span>
    </div>
  )
}