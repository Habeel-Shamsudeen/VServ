'use client'
import { useInitializeUserData } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRecoilValue } from "recoil";
import { servicesState, vehiclesState } from "@/recoil/atoms";

export default function HistoryCard(){
    const { loading } = useInitializeUserData();
    const vehicles = useRecoilValue(vehiclesState);
    const services = useRecoilValue(servicesState);

    const getServicesForVehicle = (vehicleId: number) => {
      return services.filter((service) => service.vehicleId === vehicleId);
    };
  
    return <div className="border rounded-lg h-72 overflow-hidden">
    <Card>
      <CardHeader>
        <CardTitle>Vehicle History</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {vehicles.map((vehicle) => {
          const vehicleServices = getServicesForVehicle(vehicle.id);
          return (
            <div key={vehicle.id} className="flex items-center gap-4">
              <img src="/placeholder.svg" width={75} height={75} alt="Vehicle" className="rounded-md" />
              <div className="grid gap-1">
                <div className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                <div className="text-muted-foreground">
                  {vehicleServices.length > 0 ? (
                    vehicleServices.map((service) => (
                      <div key={service.id}>
                        {service.serviceType.replace("_", " ")} - {new Date(service.scheduledAt || '').toLocaleDateString()}
                      </div>
                    ))
                  ) : (
                    <div>No service history available</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  </div>
}