'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Service, ServiceStatus, Vehicle } from '@/lib/types'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { useSetRecoilState } from 'recoil'
import { servicesState } from '@/recoil/atoms'

type ServiceCardProps = {
  id:number;
  initialStatus: ServiceStatus;
  vehicle: Vehicle | undefined;
  customerName: string | undefined
}

export function MechanicServiceCard({id, initialStatus, vehicle, customerName }: ServiceCardProps) {
  const [status, setStatus] = useState<ServiceStatus>(initialStatus);
  const [cost, setCost] = useState<string>('');
  const {toast} = useToast();
  const setServices = useSetRecoilState(servicesState);

  const handleUpdate =async () => {
    let schedule;
    if (status==ServiceStatus.COMPLETED) {
      const completedAt = new Date();
      schedule = completedAt
    }
    try {
      const response = await axios.post('/api/mechanic/services',{
        id,
        status,
        cost:parseFloat(cost) || null,
        completedAt: schedule
      });
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        const updatedService: Service = response.data.updatedService;
        setServices((services)=>
          services.map((service)=>
            service.id === id? updatedService : service
          )
        );
      }else {
        toast({
          title: response.data.msg,
          description: "Please Try Again",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "An error occurred",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl border shadow-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold">Vehicle Service Update</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <p><span className="font-medium">Make:</span> {vehicle?.make}</p>
            <p><span className="font-medium">Model:</span> {vehicle?.model}</p>
            <p><span className="font-medium">Year:</span> {vehicle?.year}</p>
            <p><span className="font-medium">Customer:</span> {customerName}</p>
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="status" className="text-lg font-semibold">Service Status</Label>
          <Select onValueChange={(value) => setStatus(value as ServiceStatus)} value={status}>
            <SelectTrigger id="status" className="text-lg py-6">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ServiceStatus).map((statusOption) => (
                <SelectItem key={statusOption} value={statusOption} className="text-lg">
                  {statusOption.charAt(0) + statusOption.slice(1).toLowerCase().replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {status === ServiceStatus.COMPLETED && (
          <div className="space-y-3">
            <Label htmlFor="cost" className="text-lg font-semibold">Service Cost ($)</Label>
            <Input
              id="cost"
              type="number"
              placeholder="Enter service cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="text-lg py-6"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpdate}
          disabled={status === ServiceStatus.COMPLETED && cost === ''}
          className="w-full text-lg py-6"
        >
          Update Service
        </Button>
      </CardFooter>
    </Card>
  )
}