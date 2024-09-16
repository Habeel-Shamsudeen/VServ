"use client";
import { useInitializeUserData } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { vehiclesState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { DeleteButton } from "../ui/delete-button";

export default function VehicleCard() {
  const { toast } = useToast();
  const { loading } = useInitializeUserData();
  const [vehicles, setVehicle] = useRecoilState(vehiclesState);
  const handleDelete = async (vehicleId: number) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/customer/vehicle",
        {
          headers: { id: vehicleId },
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setVehicle((c) => [...c.filter((c) => c.id !== vehicleId)]);
        useInitializeUserData();
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
  };
  return (
    <div className="border rounded-lg h-72 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {loading && vehicles.length === 0 ? (
            <div className="text-center text-lg">Loading</div>
          ) : vehicles.length === 0 ? (
            <div className="text-center text-lg">No vehicles added</div>
          ) : (
            ""
          )}
          {vehicles.map((vehicle) => (
            <div
              className="flex justify-between hover:bg-accent p-1 rounded-md"
              key={vehicle.id}
            >
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  width={75}
                  height={75}
                  alt="Vehicle"
                  className="rounded-md"
                />
                <div className="grid gap-1">
                  <div className="font-medium">
                    {vehicle.year} {vehicle.make}
                  </div>
                  <div className="text-muted-foreground">{vehicle.model}</div>
                </div>
              </div>
              <div className="flex justify-center flex-col">
                <DeleteButton onDelete={() => handleDelete(vehicle.id)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
