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

// Mock data for available mechanics
const mechanics = [
  { id: 1, name: "John Doe", speciality: "Engine Repair" },
  { id: 2, name: "Jane Smith", speciality: "Brake Systems" },
  { id: 3, name: "Mike Johnson", speciality: "Electrical Systems" },
  { id: 4, name: "Sarah Williams", speciality: "Transmission" },
]

export function AssignServiceComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMechanic, setSelectedMechanic] = useState<any>(null)

  const handleAssign = (mechanic:any) => {
    setSelectedMechanic(mechanic)
    setIsDialogOpen(false)
    // Here you would typically make an API call to assign the service
    console.log(`Assigned to ${mechanic.name}`)
  }

  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Wrench className="mr-2 h-4 w-4" />
            Assign Service
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                  <TableCell>{mechanic.speciality}</TableCell>
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
      {selectedMechanic && (
        <p className="mt-4">
          Service assigned to: {selectedMechanic.name} ({selectedMechanic.speciality})
        </p>
      )}
    </div>
  )
}