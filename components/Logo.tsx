import { cn } from '@/lib/utils'
import { SquareDashedMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = ({fontSize = "text-2xl" , iconSize = 20}:{ fontSize? : string , iconSize? : number}) => {
  return (
    <Link href='/' className={cn("text-2xl font-semibold flex items-center gap-2" , fontSize)}>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600
        p-2">
            <SquareDashedMousePointer size={iconSize} className='stroke-white' />
        </div>
        <div>
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">Zen</span>
            <span className='text-stone-700 dark:text-stone-300'>FLow</span>
        </div>
    </Link>

  )
}

export default Logo