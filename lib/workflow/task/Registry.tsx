import { TaskType } from "@/types/Task";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHtml";
import { workflowTask } from "@/types/workflow";
import {  FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElementTask";
import { WaitForElementTask } from "./WaitForElementTask";
import { DeliverViaWebHookTask } from "./DeliverViaWebTask";
import { ExtractDataWithAiTask } from "./ExtractDataWithAiTask";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJsonTask";
import { AddPropertyToJsonTask } from "./AddPropertyToJsonTask";
import { NavigateUrlTask } from "./NavigateUrlTask";
import { ScrollToElement } from "./ScrollToElement";
type Registry = {
    [K in TaskType] : workflowTask & { type : K}
}
export const TaskRegistry : Registry ={
    LAUNCH_BROWSER : LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT:ExtractTextFromElement,
    FILL_INPUT : FillInputTask,
    CLICK_ELEMENT : ClickElementTask,
    WAIT_FOR_ELEMENT  : WaitForElementTask,
    DELIVER_VIA_WEBHOOK : DeliverViaWebHookTask,
    EXTRACT_DATA_WITH_AI : ExtractDataWithAiTask,
    READ_PROPERTY_FROM_JSON : ReadPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON : AddPropertyToJsonTask,
    NAVIGATE_URL : NavigateUrlTask,
    SCROLL_TO_ELEMENT : ScrollToElement
}