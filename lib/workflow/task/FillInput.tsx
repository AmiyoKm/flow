import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import { CodeIcon, Edit3Icon, LucideProps } from 'lucide-react'
import React from 'react'

export const FillInputTask =  {
  type : TaskType.FILL_INPUT,
  label: "Fill Input",
  icon : (props)=> <Edit3Icon className='stroke-orange-400'{...props} />
  ,
  isEntryPoint : false,
  credits : 1,
  inputs :[
    {
        name:"Web page",
        type: TaskParamType.BROWSER_INSTANCE,
        required: true,
    },
    {
      name:"Selector",
      type: TaskParamType.STRING,
      required: true,
  },
  {
    name:"value",
    type: TaskParamType.STRING,
    required: true,
}
  ] as const,
  outputs:[
  {
    name :"Web page",
    type : TaskParamType.BROWSER_INSTANCE
  }

] as const
} satisfies workflowTask

 