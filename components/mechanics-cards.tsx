'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeleteButton } from "./ui/delete-button"
import { useRecoilState } from "recoil"
import { adminMechanicsState } from "@/recoil/atoms"
import { useToast } from "./ui/use-toast"
import axios from "axios"

export function MechanicsCardsComponent() {
  const { toast } = useToast();
  const [mechanics,setMechanics] = useRecoilState(adminMechanicsState);
  const handleDelete =async (id: number) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/admin/mechanic",
        {
          headers: { id: id },
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setMechanics((c) => [...c.filter((c) => c.id !== id)]);
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
  }
  if(mechanics.length==0){
    return <div></div>
  }

  return (
    <div className="container mx-auto py-10 border rounded-md">
      <h1 className="text-3xl font-bold mb-6">Mechanics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics.map((mechanic) => (
          <Card key={mechanic.id} className="w-full border hover:bg-muted">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{mechanic.name}</span>
                <DeleteButton
                  onDelete={() => handleDelete(mechanic.id)}
                >
                </DeleteButton>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Mechanic ID:</strong> {mechanic.mechanic?.id}</p>
              <p><strong>Email:</strong> {mechanic.email}</p>
              <p><strong>Phone:</strong> {mechanic.phoneNumber}</p>
              <p><strong>Speciality:</strong> {mechanic.mechanic?.speciality}</p>
            </CardContent>
            <CardFooter>
              <strong>Assigned Service: </strong>
              {mechanic.mechanic?.services?.length!==0 ? (
                <Badge variant="outline" className="ml-2">
                  {mechanic.mechanic?.services[0]?.id}: {mechanic.mechanic?.services[0]?.serviceType}
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