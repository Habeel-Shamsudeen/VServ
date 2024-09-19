'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Wrench } from "lucide-react"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { adminMechanicsState, servicesState } from '@/recoil/atoms'
import axios from 'axios'
import { Service, User } from '@/lib/types'
import { useToast } from './ui/use-toast'
import { unassignMechanicsSelector } from '@/recoil/selectors'


export function AssignServiceComponent({serviceId}:{
  serviceId:number
}) {
  const mechanics = useRecoilValue(unassignMechanicsSelector);
  const {toast} = useToast();
  const setServices = useSetRecoilState(servicesState);
  const setMechanics = useSetRecoilState(adminMechanicsState);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAssign =async (mechanic:User) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/service",
        {
          mechanicId: mechanic.mechanic?.id,
          serviceId : serviceId
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setServices((prevServices:Service[]) => 
          prevServices.map((service) =>
            service.id === serviceId ? response.data.service : service
          )
        );
        setMechanics((prevMech: User[]) =>
          prevMech.map((mech) => {
            if (mech.mechanic?.id === mechanic.mechanic?.id) {
              return {
                ...mech,
                mechanic: {
                  ...mech.mechanic,
                  services: [...(mech.mechanic?.services || []), response.data.service],
                },
              } as User; 
            }
            return mech;
          })
        );
      } else {
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
    setIsDialogOpen(false)
  }
  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='w-full'>
            <Wrench className="mr-2 h-4 w-4" />
            Assign Service
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Assign Service to Mechanic</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Speciality</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mechanics.map((mechanic) => (
                <TableRow key={mechanic.id}>
                  <TableCell>{mechanic.name}</TableCell>
                  <TableCell>{mechanic.mechanic?.speciality}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAssign(mechanic)} size="sm">
                      Assign
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  )
  }