"use client";

import { TaskParam, TaskParamType } from "@/types/Task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import BrowserInstanceParam from "./param/BrowserInstanceParam";
import SelectParam from "./param/SelectParam";
import CredentialParam from "./param/CredentialParam";

const NodeParamField = ({
  param,
  nodeId,
  disabled
}: {
  param: TaskParam;
  nodeId: string;
  disabled : boolean
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];
  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          param={param}
          disabled={disabled}
        />
      );
      case TaskParamType.BROWSER_INSTANCE :
        return (
            <BrowserInstanceParam
              value={""}
              updateNodeParamValue={updateNodeParamValue}
              param={param}
      
            />
          );
      case TaskParamType.SELECT : 
      return (
          <SelectParam 
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          param={param}
          disabled={disabled}
          />
      )
      case TaskParamType.CREDENTIAL : 
      return (
          <CredentialParam
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          param={param}
          disabled={disabled}
          />
      )
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
