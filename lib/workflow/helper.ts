import { AppNode } from "@/types/appNode";
import { TaskRegistry } from "./task/Registry";

export function CalculateWorkflowCost(nodes : AppNode[]){
    return nodes.reduce((acc, node)=> { 
        return acc+ TaskRegistry[node.data.type].credits
     }, 0)
}