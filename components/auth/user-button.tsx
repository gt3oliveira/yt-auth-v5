"use client"

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import { FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from './logout-button'

export function UserButton() {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user?.image || ''}
            alt={user?.name || ''}
          />
          <AvatarFallback className='bg-sky-500'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
