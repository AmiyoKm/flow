import { ExecutionPhaseStatus } from "@/types/workflow";
import {  Check , CircleDashedIcon, CircleXIcon, Loader2Icon } from "lucide-react";

export default function PhaseStatusBadge({status}:{status : ExecutionPhaseStatus}){
    switch (status) {
        case ExecutionPhaseStatus.PENDING : 
        return <CircleDashedIcon size={20} className="stroke-muted-foreground" />
        case ExecutionPhaseStatus.RUNNING : 
        return <Loader2Icon size={20} className="stroke-yellow-500 animate-spin" />
        case ExecutionPhaseStatus.FAILED : 
        return <CircleXIcon size={20} className="stroke-destructive" />
        case ExecutionPhaseStatus.COMPLETED : 
        return <Check size={20} className="stroke-green-500" />
        default : 
        return <div className="rounded-full">{status}</div>
        
    }
}