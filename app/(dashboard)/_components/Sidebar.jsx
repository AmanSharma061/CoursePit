import Image from 'next/image'
import React from 'react'
import SidebbarRoutes from './SidebbarRoutes'

const Sidebar = () => {
   
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Image src="/next.svg" alt="logo" width={100} height={100} />
      </div>
      <div className="flex flex-col w-full">
        <SidebbarRoutes />
      </div>
    </div>
  )
}

export default Sidebar  
