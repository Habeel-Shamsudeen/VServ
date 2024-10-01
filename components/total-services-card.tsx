'use client'

import React from 'react'
import { ClockIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { servicesState } from '@/recoil/atoms'
import { useRecoilValue } from 'recoil'
import { onGoingServicesSelector } from '@/recoil/selectors'

export function TotalServicesCard() {
  const totalServices = useRecoilValue(servicesState).length;
  const pendingServices = useRecoilValue(onGoingServicesSelector).length
  return (
    <Card className='boder shadow-lg'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Services</CardTitle>
        <ClockIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalServices}</div>
        <p className="text-xs text-muted-foreground">
          {pendingServices===0? "Waiting service Assignment":pendingServices+" pending"}
          
        </p>
      </CardContent>
    </Card>
  )
}