import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { UpdateWorkflowCron } from '@/actions/workflows/UpdateWorkflowCron'
import { toast } from 'sonner'
import cronstrue from "cronstrue"
import parser from "cron-parser"
import { RemoveWorkflowSchedule } from '@/actions/workflows/RemoveWorkflowSchedule'
import { Separator } from '@/components/ui/separator'
const ScheduleDialog = (props: {workflowId : string , cron :string | null}) => {
  const [cron , setCron ] = useState<string>(props.cron || "")
  const [validCron , setValidCron] = useState(false)
  const [readableCron , setReadableCron] = useState("")

 const mutation= useMutation({
    mutationFn : UpdateWorkflowCron,
    onSuccess: ()=>{
      toast.success("Schedule updated successfully" , { id : "cron"})
    },
    onError: ()=>{
      toast.error("Something went wrong" , { id : "cron"})
    }
  })
  const RemoveScheduleMutation= useMutation({
    mutationFn : RemoveWorkflowSchedule,
    onSuccess: ()=>{
      toast.success("Schedule deleted successfully" , { id : "cron"})
    },
    onError: ()=>{
      toast.error("Something went wrong" , { id : "cron"})
    }
  })
  useEffect(()=>{
    try {
      parser.parseExpression(cron)
     const humanCronStr =  cronstrue.toString(cron)
     setValidCron(true)
     setReadableCron(humanCronStr)
    } catch (error) {
     setValidCron(false)
    }
  },[cron])
  const workflowHAsValidCron = props.cron && props.cron.length > 0
  const readableSaveCron = workflowHAsValidCron && cronstrue.toString(props.cron!)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto text-orange-500" , workflowHAsValidCron && "text-primary")}>
          {
            workflowHAsValidCron &&   <div className="flex items-center gap-2">
             
              <ClockIcon />
              {readableSaveCron}
              </div>
            
          }
          {!workflowHAsValidCron && (

        <div className='flex items-center gap-1'>

        <TriangleAlertIcon className='h-3 w-3 mr-1' /> Set schedule
        </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader title='Schedule workflow execution' icon={CalendarIcon}/>
        <div className="p-6 space-y-4">
          <p className='text-muted-foreground'>Specify a cron expression to schedule periodic workflow execution. All times are in UTC</p>
          <Input placeholder='E.g. * * * * *' value={cron} onChange={(e)=> setCron(e.target.value)} />
          <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
            validCron && "border-primary  text-primary" 
          )}>{validCron ? readableCron : "Not a valid cron expression"}</div>
        </div>
        {
          workflowHAsValidCron && <DialogClose asChild>
              <div className="px-5">
                <Button className='w-full text-destructive border-destructive hover:text-destructive' variant={"outline"} disabled={
                  mutation.isPending || RemoveScheduleMutation.isPending
                } onClick={()=>{
                  toast.loading("Removing schedule..." ,{ id : "cron"})
                  RemoveScheduleMutation.mutate(props.workflowId)
                }}>Remove current schedule</Button>
                <Separator className='my-4' />
              </div>
          </DialogClose>
        }
        <DialogFooter className='px-6 gap-2'>
          <DialogClose asChild>
            <Button className='w-full' variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={()=>{
              toast.loading("Saving...", {id : "cron"})
              mutation.mutate({
                id: props.workflowId,
                cron : cron
              })
            }} className='w-full' disabled={mutation.isPending || !validCron}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleDialog