import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  LucideProps, MousePointerClickIcon, TextIcon } from 'lucide-react'
import React from 'react'

export const ClickElementTask =  {
  type : TaskType.CLICK_ELEMENT,
  label: "Click element",
  icon : (props)=> <MousePointerClickIcon className='stroke-orange-400'{...props} />
  ,
  isEntryPoint : false,
  credits: 1,
  inputs :[
    {
        name:"Web Page",
        type: TaskParamType.BROWSER_INSTANCE,
        required: true,
        variant : "textarea",
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

 