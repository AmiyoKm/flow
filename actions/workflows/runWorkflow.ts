"use server"


import { prisma } from "@/lib/prisma"
import { ExecuteWorkflow } from "@/lib/workflow/ExecuteWorkflow"
import { FLowToExecutionPlan } from "@/lib/workflow/FLowToExecutionPlan"
import { TaskRegistry } from "@/lib/workflow/task/Registry"
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function RunWorkflow(form : {workflowId : string , flowDefinition? : string}){
    const {userId } = await auth()

    if(!userId){
        throw new Error("unauthenticated")
    }
    const {workflowId , flowDefinition} = form
    if(!workflowId){
        throw new Error("workflowId is required")
    }

    const workflow = await prisma.workflow.findUnique({
        where : {
            userId,
            id : workflowId
        },
    })
    if(!workflow){
        throw new Error("workflow not found")
    }
    let executionPlan : WorkflowExecutionPlan

    if(!flowDefinition){
        throw new Error("workflow definition not found")
    }
    const flow = JSON.parse(flowDefinition)
    const result = FLowToExecutionPlan(flow.nodes , flow.edges) 
    if(result.error){
        throw new Error("flow definition not valid")
    }  
    if(!result.executionPlan){
        throw new Error("no execution plan generated")
    }
    executionPlan = result.executionPlan
    
    const execution = await prisma.workflowExecution.create({
        data :{
            workflowId,
            userId,
            status :WorkflowExecutionStatus.PENDING,
            startedAt : new Date(),
            trigger : WorkflowExecutionTrigger.MANUAL,
            definition : flowDefinition,
            phases :{
                create : executionPlan.flatMap(phase=> phase.nodes.flatMap((node)=>{
                    return {
                        userId,
                        status :ExecutionPhaseStatus.CREATED,
                        number : phase.phase,
                        node : JSON.stringify(node),
                        name : TaskRegistry[node.data.type].label,

                    }
                }))
            }
        },
        select :{
            id : true,
            phases : true
        }
    })
    if(!execution){
        throw new Error("Execution not created")
    }

    ExecuteWorkflow(execution.id)
    redirect(`/workflow/runs/${workflow.id}/${execution.id}`)
}