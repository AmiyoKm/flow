import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  FileJson2Icon } from 'lucide-react'
import React from 'react'

export const ReadPropertyFromJsonTask =  {
  type : TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from JSON",
  icon : (props)=> <FileJson2Icon className='stroke-orange-400'{...props} />
  ,
  isEntryPoint : false,
  credits: 1,
  inputs :[
    {
        name:"JSON",
        type: TaskParamType.STRING,
        required: true,
        variant : "textarea",
    },
    {
      name:"Property name",
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const ,
  outputs:[{
    name : "Property value" ,
    type : TaskParamType.STRING
  }

] as const
} satisfies workflowTask

 