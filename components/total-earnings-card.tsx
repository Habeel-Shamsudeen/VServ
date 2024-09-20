'use client'
import React from 'react'
import { DollarSignIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRecoilValue } from 'recoil'
import { completedServicesSelector } from '@/recoil/selectors'

export function TotalEarningsCard() {
  const services = useRecoilValue(completedServicesSelector);
  let totalEarnings = 0;

  services.forEach((s) => {
    if (s.cost) {
      totalEarnings += s.cost; // Only add if cost exists
    }
  });

  return (
    <Card className='border shadow-lg'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${totalEarnings.toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground">
          From {services.length} completed {services.length === 1 ? 'service' : 'services'}
        </p>
      </CardContent>
    </Card>
  )
}
