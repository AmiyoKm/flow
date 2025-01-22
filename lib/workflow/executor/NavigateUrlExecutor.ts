
import {  ExecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/ClickElementTask";
import { NavigateUrlTask } from "../task/NavigateUrlTask";
export async function NavigateUrlExecutor(environment: ExecutionEnvironment<typeof NavigateUrlTask>) : Promise<boolean>{
    
    try {
       const URL = environment.getInput("URL")
       if(!URL){
        environment.log.error("input->URL not defined")
       }
      
       
       await environment.getPage()!.goto(URL)
       environment.log.info(`visited url: ${URL}`)
        return true
    } catch (error : any) {
        environment.log.error(error.message)

        return false
    }

    
   
}