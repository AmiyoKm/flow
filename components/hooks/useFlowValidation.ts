import { useContext } from "react";
import { FlowValidationContext } from "../context/FlowValidationCOntext";

export default function useFlowValidation(){
    const context = useContext(FlowValidationContext)

    if(!context){
        throw new Error("useFlowValidation must be used within a FlowValidContext")
    }
    return context;
}

