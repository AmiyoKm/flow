import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  DatabaseIcon } from 'lucide-react'
import React from 'react'

export const AddPropertyToJsonTask =  {
  type : TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add Property To Json",
  icon : (props)=> <DatabaseIcon className='stroke-orange-400'{...props} />
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
    ,
    {
      name:"Property value",
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const ,
  outputs:[{
    name : "Updated JSON" ,
    type : TaskParamType.STRING
  }

] as const
} satisfies workflowTask

 