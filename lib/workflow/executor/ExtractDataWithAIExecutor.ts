
import {  ExecutionEnvironment } from "@/types/executor"
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAiTask";
import { prisma } from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAI from "openai"
export async function ExtractDataWIthAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>) : Promise<boolean>{
    
    try {
       const credentials = environment.getInput("Credentials")
       if(!credentials){
        environment.log.error("input->credentials not defined")
       }
       const Prompt = environment.getInput("Prompt")
       if(!Prompt){
        environment.log.error("input->Prompt not defined")
       }
       const Content = environment.getInput("Content")
       if(!Content){
        environment.log.error("input->Content not defined")
       }
      
       const credential = await prisma.credential.findUnique({
        where : {id : credentials}
       })
       if(!credential){
        environment.log.error("credential not found")
        return false
       }
       const plainCredentialValue = symmetricDecrypt(credential.value)
       if(!plainCredentialValue){
        environment.log.error("cannot decrypt credential")
       }
     const openai = new OpenAI({
        apiKey : plainCredentialValue
     })
     const response  = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages : [
            {
                role : "system",
                content : "You are a webscraper helper that extracts data from HTML or text .You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object , without any addition words or explanation . Analyze the input carefully and extract data and ensure the output is always a valid JSON array without any surrounding text"
            },
            {
                role: "user",
                content : Content
            },
            {
                role : "user",
                content : Prompt
            }
        ],
        temperature : 1
     })
     
       environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`)
       environment.log.info(`Completion tokens: ${response.usage?.completion_tokens}`)
       environment.log.info(`Total tokens: ${response.usage?.total_tokens}`)
      
       const result = response.choices[0].message?.content
       if(!result){
            environment.log.error("empty response from AI")
            return false
       }
       environment.setOutput("Extracted data", result)

        return true
    } catch (error : any) {
        environment.log.error(error.message)

        return false
    }

    
   
}