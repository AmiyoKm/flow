
import {  ExecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/ClickElementTask";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJsonTask";
export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>) : Promise<boolean>{
    
    try {
       const JsonData = environment.getInput("JSON")
       if(!JsonData){
        environment.log.error("input->JsonData not defined")
       }

       const propertyName = environment.getInput("Property name")
       if(!JsonData){
        environment.log.error("input->Property Name not defined")
       }
      
       const json = JSON.parse(JsonData)
       const propertyValue = json[propertyName]
       if(propertyName===undefined){
        environment.log.error("property not found")
        return false
       }
       environment.setOutput("Property value" , propertyValue)
      
        return true
    } catch (error : any) {
        environment.log.error(error.message)

        return false
    }

    
   
}