'use client'
import { Button } from '../../../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavbarRoutes = () => {
    const pathname = usePathname()
    const isTeacher = pathname.includes('/teacher')
  
  return (
    <div className=' flex ml-auto items-center gap-x-4'>
    {isTeacher && (
      <Link href='/' className='ml-auto'>
        <Button size='sm' variant='ghost'>
          <LogOut className='h-4 w-4 mr-2' />
          Exit
        </Button>
      </Link>
    )}

    {!isTeacher && (
      <Link href='/teacher/courses' className='ml-auto '>
        <Button>Teacher mode</Button>
      </Link>
    )}

    <UserButton afterSignOutUrl='/' />
  </div>
  )
}

export default NavbarRoutes
