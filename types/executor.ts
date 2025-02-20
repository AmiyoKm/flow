import { Browser, Page } from "puppeteer"
import { workflowTask } from "./workflow"
import { LogCollector } from "./log"

export type Environment ={
    browser ? : Browser,
    page? : Page
    //phase with nodeId/taskId as key
    phases : {
        [key : string] : { // key : nodeId/taskId
            inputs  : Record<string, string>,
            outputs : Record<string , string>
        }
    }
}

export type ExecutionEnvironment <T extends workflowTask>= {
    getInput(name : T["inputs"][number]["name"]) : string 
    setOutput (name : T["outputs"][number]['name'] , value : string): void
    getBrowser(): Browser | undefined
    setBrowser(browser:Browser) : void
    setPage(page : Page) : void
    getPage() : Page | undefined

    
    log : LogCollector

}