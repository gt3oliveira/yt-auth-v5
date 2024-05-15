import React from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export function Social() {
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button size={'lg'} variant={'outline'} className='w-full'
        onClick={() => { }}
      >
        <FcGoogle size={24} />
      </Button>
      <Button size={'lg'} variant={'outline'} className='w-full'
        onClick={() => { }}
      >
        <FaGithub size={24} />
      </Button>
    </div>
  )
}
