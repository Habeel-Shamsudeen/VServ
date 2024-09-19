'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type Service = {
  id: string
  serviceType: string
}

type Mechanic = {
  id: string
  name: string
  email: string
  phoneNumber: string
  speciality: string
  assignedService: Service | null
}

const mechanics: Mechanic[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    speciality: "Engine Repair",
    assignedService: { id: "S1", serviceType: "Oil Change" },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "098-765-4321",
    speciality: "Transmission",
    assignedService: null,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phoneNumber: "555-123-4567",
    speciality: "Brakes",
    assignedService: { id: "S2", serviceType: "Brake Inspection" },
  },
]

export function MechanicsCardsComponent() {
  const handleDelete = (id: string) => {
    console.log(`Delete mechanic with id: ${id}`)
    // Implement delete logic here
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mechanics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics.map((mechanic) => (
          <Card key={mechanic.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{mechanic.name}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(mechanic.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>ID:</strong> {mechanic.id}</p>
              <p><strong>Email:</strong> {mechanic.email}</p>
              <p><strong>Phone:</strong> {mechanic.phoneNumber}</p>
              <p><strong>Speciality:</strong> {mechanic.speciality}</p>
            </CardContent>
            <CardFooter>
              <strong>Assigned Service: </strong>
              {mechanic.assignedService ? (
                <Badge variant="outline" className="ml-2">
                  {mechanic.assignedService.id}: {mechanic.assignedService.serviceType}
                </Badge>
              ) : (
                <Badge variant="secondary" className="ml-2">Unassigned</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}