import { TaskParamType, TaskType } from '@/types/Task'
import { workflowTask } from '@/types/workflow'
import {  SendIcon } from 'lucide-react'
import React from 'react'

export const DeliverViaWebHookTask =  {
  type : TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via Webhook",
  icon : (props)=> <SendIcon className='stroke-blue-400'{...props} />
  ,
  isEntryPoint : false,
  credits: 1,
  inputs :[
    {
        name:"Target Url",
        type: TaskParamType.STRING,
        required: true,
    },
    {
      name:"Body",
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const ,
  outputs:[] as const
} satisfies workflowTask

 