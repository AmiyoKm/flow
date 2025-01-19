import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/Task";
import { Handle, Position, useEdges } from "@xyflow/react";
import { ReactNode } from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./Common";
import useFlowValidation from "@/components/hooks/useFlowValidation";

export function NodeInputs({children}:{children: ReactNode}){
    return <div className="flex flex-col divide-y gap-2">
        {children}
    </div>
}

export function NodeInput({ input , nodeId}: {input: TaskParam , nodeId : string}){

    const {invalidInputs}   =useFlowValidation()
    const edges = useEdges()
    const isConnected = edges.some((edge)=>edge.target === nodeId &&  edge.targetHandle===input.name)
    const hasErrors = invalidInputs.find(node => node.nodeId ===nodeId )?.inputs.find(invalidInput => invalidInput === input.name)
    return <div className={cn("flex justify-start relative p-3 bg-secondary w-full" , hasErrors && "bg-destructive/30" )}>
        <NodeParamField nodeId={nodeId} param={input} disabled={isConnected} />
        {!input.hideHandle &&(
             <Handle id={input.name} type="target" position={Position.Left} isConnectable={!isConnected}
             className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",ColorForHandle[input.type])}
             />
        )}
       
    </div>
}