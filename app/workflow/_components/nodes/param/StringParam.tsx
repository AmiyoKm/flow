"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ParamProps } from '@/types/appNode'
import React, { useEffect, useId, useState } from 'react'

const StringParam = ({param , value , updateNodeParamValue , disabled}: ParamProps ) => {
    const id = useId()
    let Component : any = Input
    const [internalValue ,  setInternalValue] = useState(value)
    useEffect(()=>{ 
      setInternalValue(value)
    },[value])
    if(param.variant ==="textarea"){
      Component = Textarea
    }
  return (
    <div className='space-y-1 p-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>{param.name}
        {param.required && <p className='text-red-400 px-2'>*</p>}
        </Label>
        
        <Component id={id} 
        className='text-xs'
        value={internalValue}
        placeholder='Enter Value here'
        onChange={(e : React.ChangeEvent<HTMLInputElement> )=> setInternalValue(e.target.value)}
        onBlur={(e  : React.ChangeEvent<HTMLInputElement>)=>updateNodeParamValue(e.target.value)}
        disabled={disabled}
        />
        {param.helperText && (
            <p className='text-muted-foreground px-2 '>{param.helperText}</p>
        )}
    </div>
  )
}

export default StringParam