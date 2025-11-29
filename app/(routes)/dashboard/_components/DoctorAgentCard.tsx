"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@clerk/nextjs';
// import { Badge } from 'lucide-react';
import { useSubscription } from "@clerk/nextjs/experimental";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

export type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    voiceId?:string
    subscriptionRequired:boolean
};
type props={
    doctorAgent:doctorAgent
}
function DoctorAgentCard({doctorAgent}: props) {
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const { has }=useAuth();
    const freeUser = has && has({ plan: "free_user" });
const paidUser = !freeUser;

    console.log(paidUser);

    const onStartConsultation=async()=>{
      //save all info to database
      setLoading(true);
      const result=await axios.post('/api/session-chat',{
        notes:'New Query',
        selectedDoctor:doctorAgent
      });
      console.log(result.data);
      if(result.data?.sessionId)
      {
        console.log(result.data.sessionId);
        //route new conversation screen
          router.push('/dashboard/medical-agent/'+result.data.sessionId);
      }
      setLoading(false);
    }

    return (
        <div className=''>
            {doctorAgent.subscriptionRequired && <Badge>
                Premium
            </Badge>}
            <Image src={doctorAgent.image} alt={doctorAgent.specialist}
            width={200}
            height={300}
            className='w-full h-[250px] object-cover round-xl'/>
            <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
            <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
            <Button className='w-full mt-2'
            onClick={onStartConsultation} disabled={!paidUser&&doctorAgent.subscriptionRequired}>Start Consultation {loading?<Loader2Icon className='animate-spin'/>:<IconArrowRight /> }</Button>
        </div>
     
    )
}

export default DoctorAgentCard
