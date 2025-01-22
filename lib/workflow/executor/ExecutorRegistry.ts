import { TaskType } from "@/types/Task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { workflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElement";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebHookExecutor";
import { ExtractDataWIthAiExecutor } from "./ExtractDataWithAIExecutor";
import { ReadPropertyFromJsonExecutor } from "./ReadPropertyFromJsonExecutor";
import { AddPropertyToJsonExecutor } from "./AddPropertyToJsonExecutor";
import { NavigateUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollToElementExecutor } from "./ScrollToElementExecutor";

type ExecutorFn<T extends workflowTask> = (environment : ExecutionEnvironment<T>)=> Promise<boolean>

type RegistryType = {
    [K in TaskType] : ExecutorFn<workflowTask & {type : K}>
}
export const ExecutorRegistry : RegistryType ={
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML : PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT :ExtractTextFromElementExecutor,
    FILL_INPUT : FillInputExecutor,
    CLICK_ELEMENT : ClickElementExecutor,
    WAIT_FOR_ELEMENT : WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK : DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI : ExtractDataWIthAiExecutor,
    READ_PROPERTY_FROM_JSON : ReadPropertyFromJsonExecutor,
    ADD_PROPERTY_TO_JSON : AddPropertyToJsonExecutor,
    NAVIGATE_URL : NavigateUrlExecutor,
    SCROLL_TO_ELEMENT : ScrollToElementExecutor
}