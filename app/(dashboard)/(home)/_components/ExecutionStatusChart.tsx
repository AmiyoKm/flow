"use client"

import { GetWorkflowExecutionStats } from '@/actions/analytics/GetWorkflowExecutionStats'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {  Layers2 } from 'lucide-react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
  
type ChartData = Awaited<ReturnType <typeof GetWorkflowExecutionStats>>
const ExecutionStatusChart = ({data} : {data : ChartData}) => {
    const ChartConfig = {
        success : {
            label : "Success",
            color : "hsl(var(--chart-2))"
        },
        failed :{
            label : "Failed",
            color : "hsl(var(--chart-1))"
        }
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex items-center gap-2'> 
                <Layers2 className='w-6 h-6 text-primary' />
                Workflow execution status
            </CardTitle>
            <CardDescription>
                Daily number of successful and failed workflow executions
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={ChartConfig} className='max-h-[200px] w-full'>
                <AreaChart data={data} height={200} accessibilityLayer margin={{top : 20}}  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey={"date"} 
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value)=> {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US",{
                            month : "short",
                            day : "numeric"
                        })
                    }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <ChartTooltip content={<ChartTooltipContent className='w-[250px]' />} />
                    <Area min={0} type={"bump"} fill='var(--color-success)' fillOpacity={0.6} stroke='var(--color-success)' dataKey={"success"} stackId={"a"} />
                    <Area min={0} type={"bump"} fill='var(--color-failed)' fillOpacity={0.6} stroke='var(--color-failed)' dataKey={"failed"} stackId={"a"} />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default ExecutionStatusChart