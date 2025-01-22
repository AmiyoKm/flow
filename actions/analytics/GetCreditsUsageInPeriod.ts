"use server"

import { PeriodToDateRange } from "@/lib/helper/dates";
import { prisma } from "@/lib/prisma";
import { ExecutionPhase } from "@/prisma/generated/client";
import { Period } from "@/types/analytics";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";
type Stat =  Record<string , {
    success : number,
    failed : number
}>
type Infos = {
    success: number;
    failed: number;
  };
export async function GetCreditsUsageInPeriod(period:Period) {
    const {userId} = await auth()
    if(!userId){
        throw new Error("unauthenticated")
    }
    const dateRange = PeriodToDateRange(period)

    const executionPhases = await prisma.executionPhase.findMany({
        where : {
            userId ,
            startedAt : {
                gte : dateRange.startDate,
                lte : dateRange.endDate
            },
            status : {
                in : [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED]
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
    },{} as any)
    executionPhases.forEach((phase : ExecutionPhase)=> {
        const date = format(phase.startedAt! , dateFormat)
        if(phase.status === ExecutionPhaseStatus.COMPLETED){
            stats[date].success += phase.creditsConsumed || 0
        }
        if(phase.status === ExecutionPhaseStatus.FAILED){
            stats[date].failed += phase.creditsConsumed || 0
        }
    })
    const result = Object.entries(stats).map(([date , infos] : [string, Infos])=> 
    {
        return { date , ...infos}
    }
    )
    return result
}