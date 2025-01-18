import { TaskParamType, TaskType } from '@/types/Task'
import {  LucideProps, TextIcon } from 'lucide-react'
import React from 'react'

export const ExtractTextFromElement =  {
  type : TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon : (props: LucideProps)=> <TextIcon className='stroke-rose-400'{...props} />
  ,
  isEntryPoint : false,
  inputs :[
    {
        name:"Html",
        type: TaskParamType.STRING,
        required: true,
    },
    {
      name:"Selector",
      type: TaskParamType.STRING,
      required: true,
    }
  ],
  outputs:[{
    name : "Extracted text" ,
    type : TaskParamType.STRING
  }

]
}

 