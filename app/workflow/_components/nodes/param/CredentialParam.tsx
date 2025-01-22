import { ParamProps } from '@/types/appNode'
import React, { useId } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { GetCredentialsForUser } from '@/actions/credentials/GetCredentialsForUser'
import { Credential } from '@/prisma/generated/client'

const CredentialParam = ({param , updateNodeParamValue , value}:ParamProps) => {
  const query = useQuery({
    queryKey :["credentials"],
    queryFn : ()=> GetCredentialsForUser(),
    refetchInterval : 10000
  })
  console.log(query.data);
  
  const id = useId()
  return (
    <div className='flex flex-col gap-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-400 px-2'>*</p> }
      </Label>
      <Select onValueChange={(value) => updateNodeParamValue(value)} defaultValue={value}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Credentials</SelectLabel>
        {query.data?.map((credential :Credential )=>(
          <SelectItem key={credential.id} value={credential.id}>{credential.name}</SelectItem>
        ))}
    </SelectGroup>
  </SelectContent>
</Select>

    </div>
  )
}

export default CredentialParam