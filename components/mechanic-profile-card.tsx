'use client'

import React from 'react'
import { WrenchIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mechanic } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { mechanicsState } from '@/recoil/atoms'

export function MechanicProfileCard() {
  const mechanic : Mechanic | null = useRecoilValue(mechanicsState) 
  return (
    <Card className='border shadow-lg'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-semibold">Mechanic Profile</CardTitle>
        <WrenchIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt={mechanic?.user.name || 'Mechanic'} />
            <AvatarFallback>{(mechanic?.user.name || 'M').charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-bold">{mechanic?.user.name || 'Unknown Mechanic'}</p>
            <p className="text-sm text-muted-foreground">{mechanic?.user.email || 'No email provided'}</p>
            <p className="text-sm text-muted-foreground">{mechanic?.user.phoneNumber || 'No phone number provided'}</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="secondary">{mechanic?.speciality.replace('_', ' ')}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}