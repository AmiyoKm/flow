import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  BrainIcon } from 'lucide-react'
import React from 'react'

export const ExtractDataWithAiTask =  {
  type : TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract Data With AI",
  icon : (props)=> <BrainIcon className='stroke-rose-400'{...props} />
  ,
  isEntryPoint : false,
  credits: 3,
  inputs :[
    {
        name:"Content",
        type: TaskParamType.STRING,
        required: true,
    },
    {
      name:"Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    }
    ,
    {
      name:"Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant :"textarea"
    }
  ] as const ,
  outputs:[{
    name : "Extracted data" ,
    type : TaskParamType.STRING
  }

] as const
} satisfies workflowTask

 