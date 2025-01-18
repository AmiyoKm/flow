import Logo from '@/components/Logo'
import React from 'react'

const layout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center grow gap-4' >
        <Logo />
        {children}</div>
  )
}

export default layout