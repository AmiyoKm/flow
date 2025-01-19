"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const { mutate, isPending } = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          //client side validation
          return;
        }
        mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon className="stroke-orange-400 " size={16} />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
