import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  ArrowUpIcon, LucideProps, MousePointerClickIcon, TextIcon } from 'lucide-react'
import React from 'react'

export const ScrollToElement =  {
  type : TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to  element",
  icon : (props)=> <ArrowUpIcon className='stroke-orange-400'{...props} />
  ,
  isEntryPoint : false,
  credits: 1,
  inputs :[
    {
        name:"Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
        required: true,
    },
    {
      name:"Selector",
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const ,
  outputs:[{
    name : "Web Page" ,
    type : TaskParamType.BROWSER_INSTANCE
  }

] as const
} satisfies workflowTask

 