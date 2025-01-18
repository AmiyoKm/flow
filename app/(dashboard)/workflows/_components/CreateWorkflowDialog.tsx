"use client";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "../../../../components/ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createWorkflowSchemaType,
  createWorkflowSchema,
} from "@/schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
        name: "",
        description: ""
    },
  });
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow added", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const onSubmit = useCallback((data: createWorkflowSchemaType) => {
    toast.loading("Creating workflow...", {
      id: "create-workflow",
    });
    mutate(data);
  }, []);
  return (
    <Dialog open={open} onOpenChange={(open)=> {
        form.reset()
        setOpen(open)
    }} >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              action=""
              className="space-y-6 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and a unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br />
                      This is optional but can help you remember the purpose of
                      the workflow.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending &&  "Proceed"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
