import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-y-4'>
      <h1 className='text-4xl font-bold text-[#103FEF]/95'>Log in to continue</h1>
      {children}
    </div>
  )
}

export default layout
