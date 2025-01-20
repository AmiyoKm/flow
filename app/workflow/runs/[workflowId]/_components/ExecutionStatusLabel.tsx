"use client"

import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow";
const labelColor : Record<WorkflowExecutionStatus, string> ={
    PENDING : "text-slate-400",
    RUNNING : "text-yellow-400",
    FAILED : "text-red-400",
    COMPLETED : "text-emerald-600"
  }
export function ExecutionStatusLabel({status } : {status : WorkflowExecutionStatus}){
    return <span className={cn("lowercase" , labelColor[status])}>
        {status}
    </span>
}