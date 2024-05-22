"use client"
import { admin } from '@/actions/admin'
import RoleGate from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import { toast } from 'sonner'

export default function AdminPage() {
  const serverActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error)
      }

      if (data.success) {
        toast.success(data.success)
      }
    })
  }
  const onApiRouterClick = () => {
    fetch("api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success('Rotas de API para Admin testadas com sucesso!')
        } else {
          toast.error('Erro ao testar rotas de API para Admin!')
        }
      })
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>
          🔑 Admin
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message='Você está autenticado como admin!'
          />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>
            Rotas de API para Admin
          </p>
          <Button onClick={onApiRouterClick}>
            Click para testar
          </Button>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>
            Ações do servidor para Admin
          </p>
          <Button onClick={serverActionClick}>
            Click para testar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
