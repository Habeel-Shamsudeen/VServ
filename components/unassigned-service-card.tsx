'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ClipboardListIcon, ClockIcon, FileTextIcon, AlertCircleIcon } from "lucide-react"

interface ServiceCardProps {
  id: string
  serviceType: string
  scheduledTime: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

export function UnassignedServiceCard({ 
  id = "SRV-001", 
  serviceType = "Maintenance", 
  scheduledTime = "2023-06-15 14:00", 
  description = "Regular maintenance check for HVAC system in Building A",
  priority = 'medium'
}: Partial<ServiceCardProps>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TooltipProvider>
      <Card 
        className="w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="relative">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Unassigned Service</CardTitle>
            <Badge variant="outline">{id}</Badge>
          </div>
          <CardDescription className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${isHovered ? 'animate-ping' : ''} bg-orange-500`} />
            Awaiting assignment
          </CardDescription>
          <Badge className={`absolute top-0 right-0 mt-1 mr-1 ${priorityColors[priority]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <ClipboardListIcon className="w-4 h-4 text-primary" />
            <span className="font-medium">{serviceType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 text-primary" />
            <span>{scheduledTime}</span>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-start space-x-2">
                <FileTextIcon className="w-4 h-4 text-primary mt-1" />
                <p className="text-sm text-muted-foreground truncate">{description}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{description}</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <AlertCircleIcon className="w-4 h-4 mr-2" />
            Assign Service
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}