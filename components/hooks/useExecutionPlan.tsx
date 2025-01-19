import { ErrorType, FLowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/FLowToExecutionPlan"
import { AppNode } from "@/types/appNode"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import useFlowValidation from "./useFlowValidation"
import { toast } from "sonner"

const useExecutionPlan =()=>{
    const {toObject}= useReactFlow()
    const {setInvalidInputs , clearErrors} = useFlowValidation()

    const handleError = useCallback((error : ErrorType)=>{
        switch(error.type){
            case FlowToExecutionPlanValidationError.NO_ENTRYPOINT :
                toast.error("No entry found")
                break;
            case FlowToExecutionPlanValidationError.INVALID_INPUTS :
                toast.error("Not all input values are set")
                setInvalidInputs(error.invalidElements!)
                break;

            default:
                toast.error("Something went wrong")
        }
    },[])

    const generateExecutionPlan = useCallback(()=>{
        const {nodes ,edges} = toObject()
        const {executionPlan , error} = FLowToExecutionPlan(nodes as AppNode[],edges) 
        if(error){
            handleError(error)
            return null
        }
        clearErrors()
        return executionPlan
    },[toObject , handleError , clearErrors])

    return generateExecutionPlan
}

export default useExecutionPlan