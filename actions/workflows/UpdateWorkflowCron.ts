"use server"
import parser from "cron-parser"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function UpdateWorkflowCron({id , cron}: {id : string , cron : string}){
    const {userId} = await auth()
    if(!userId){
        throw new Error("unauthenticated")
    }
    try {
    const interval = parser.parseExpression(cron , {utc : true})
     await prisma.workflow.update({
        where : {id , userId},
         data : {
            cron ,
            nextRunAt : interval.next().toDate()
         }
    })
    revalidatePath(`/workflows`)
    } catch (error) {
        throw new Error("Invalid cron expression")
    }
}