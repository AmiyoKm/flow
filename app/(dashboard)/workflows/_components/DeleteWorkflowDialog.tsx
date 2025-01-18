"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow'
import { toast } from 'sonner'
interface Props {
  open : boolean
  setOpen : Dispatch<SetStateAction<boolean>>,
  workflowName : string
  workflowId : string
}
const DeleteWorkflowDialog = ({open ,setOpen ,workflowName,workflowId}: Props) => {
  const [confirmText, setConfirmText] = useState("")
 const deleteMutation = useMutation({
    mutationFn : DeleteWorkflow,
    onSuccess : ()=>{
      toast.success("Workflow deleted successfully",{id : workflowId})
      setConfirmText("")
    },
    onError :()=>{
      toast.success("Something went wrong",{id : workflowId})
    }
  })
  return (
    
    <AlertDialog open={open} onOpenChange={(open)=> {
      setOpen(open) 
      setConfirmText("")
    }} >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your workflow
          and remove the data from our servers.
          <div className='flex flex-col py-4 gap-2'>
            <p>If you are sure , enter <b>{workflowName} to confirm:</b></p>
            <Input value={confirmText} onChange={(e)=> setConfirmText(e.target.value)}/>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-destructive hover:bg-destructive/90' disabled={confirmText!==workflowName || deleteMutation.isPending} onClick={(e)=>{
          e.stopPropagation()
          toast.loading("Deleting workflow...",{id:workflowId})
          deleteMutation.mutate(workflowId)
        }}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default DeleteWorkflowDialog