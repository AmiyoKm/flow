
import {  ExecutionEnvironment } from "@/types/executor"
import { AddPropertyToJsonTask } from "../task/AddPropertyToJsonTask";
export async function AddPropertyToJsonExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>) : Promise<boolean>{
    
    try {
       const JsonData = environment.getInput("JSON")
       if(!JsonData){
        environment.log.error("input->JsonData not defined")
       }

       const propertyName = environment.getInput("Property name")
       if(!JsonData){
        environment.log.error("input->Property Name not defined")
       }
       const propertyValue = environment.getInput("Property value")
       if(!propertyValue){
        environment.log.error("input-> propertyValue not defined")
       }
      
       const json = JSON.parse(JsonData)
       json[propertyName] = propertyValue

      environment.setOutput("Updated JSON", JSON.stringify(json))
        return true
    } catch (error : any) {
        environment.log.error(error.message)

        return false
    }

    
   
}