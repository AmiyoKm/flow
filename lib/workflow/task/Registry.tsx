import { TaskType } from "@/types/Task";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHtml";
import { workflowTask } from "@/types/workflow";
type Registry = {
    [K in TaskType] : workflowTask & { type : K}
}
export const TaskRegistry : Registry ={
    LAUNCH_BROWSER : LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT:ExtractTextFromElement
}