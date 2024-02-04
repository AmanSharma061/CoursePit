import {Sheet, SheetContent, SheetTrigger} from "../../../components/ui/sheet"
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu className='h-10 w-10' />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
