"use client"
//waterfall serverAction
import React, { useState } from 'react'
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
import { toast } from 'sonner'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { DeleteCredential } from '@/actions/credentials/DeleteCredential'
interface Props {
 name : string
}
const DeleteCredentialDialog = ({name ,}: Props) => {
  const [open,setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
 const deleteMutation = useMutation({
    mutationFn : DeleteCredential,
    onSuccess : ()=>{
      toast.success("Credential deleted successfully",{id : name})
      setConfirmText("")
    },
    onError :()=>{
      toast.success("Something went wrong",{id : name})
    }
  })
  return (
    
    <AlertDialog open={open} onOpenChange={(open)=> {
      setOpen(open) 
    }} >
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <XIcon size={18} />
        </Button>
        </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your credential
          and remove the credential from our servers.
          <div className='flex flex-col py-4 gap-2'>
            <p>If you are sure , enter <b>{name} to confirm:</b></p>
            <Input value={confirmText} onChange={(e)=> setConfirmText(e.target.value)}/>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-destructive hover:bg-destructive/90' disabled={confirmText!==name || deleteMutation.isPending} onClick={(e)=>{
         e.stopPropagation()
          toast.loading("Deleting Credential...",{id:name})
          deleteMutation.mutate(name)
        }}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default DeleteCredentialDialog