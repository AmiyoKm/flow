import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import { CodeIcon, LucideProps } from 'lucide-react'
import React from 'react'

export const PageToHtml =  {
  type : TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon : (props: LucideProps)=> <CodeIcon className='stroke-rose-400'{...props} />
  ,
  isEntryPoint : false,
  credits : 2,
  inputs :[
    {
        name:"Web page",
        type: TaskParamType.BROWSER_INSTANCE,
        required: true,
    }
  ] as const,
  outputs:[{
    name : "Html" , type : TaskParamType.STRING
  },
  {
    name :"Web page",
    type : TaskParamType.BROWSER_INSTANCE
  }

] as const
} satisfies workflowTask

 