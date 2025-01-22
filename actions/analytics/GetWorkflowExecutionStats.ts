"use server"

import { PeriodToDateRange } from "@/lib/helper/dates";
import { prisma } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { WorkflowExecution } from "@/prisma/generated/client";

import { eachDayOfInterval, format } from "date-fns";
type Stat =  Record<string , {
    success : number,
    failed : number
}>
type Infos = {
    success: number;
    failed: number;
  };
  
export async function GetWorkflowExecutionStats(period:Period) {
    const {userId} = await auth()
    if(!userId){
        throw new Error("unauthenticated")
    }
    const dateRange = PeriodToDateRange(period)

    const executions = await prisma.workflowExecution.findMany({
        where : {
            userId ,
            startedAt : {
                gte : dateRange.startDate,
                lte : dateRange.endDate
            }
        }
    })
    const dateFormat = "yyyy-MM-dd"
    const stats: Stat = eachDayOfInterval({
        start : dateRange.startDate ,
        end : dateRange.endDate
    }).map((date)=> format(date , dateFormat))
    .reduce((acc,date)=>{
        acc[date] ={
            success : 0,
            failed : 0
        }
        return acc
    },{} as Stat)
    executions.forEach((execution : WorkflowExecution)=> {
        const date = format(execution.startedAt! , dateFormat)
        if(execution.status === WorkflowExecutionStatus.COMPLETED){
            stats[date].success += 1 
        }
        if(execution.status === WorkflowExecutionStatus.FAILED){
            stats[date].failed += 1 
        }
    })
    const result = Object.entries(stats).map(([date  , infos]: [string ,Infos ])=> 
    {
        return { date , ...infos}
    }
    )
    return result
}