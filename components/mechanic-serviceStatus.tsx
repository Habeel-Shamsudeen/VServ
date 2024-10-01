"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { activeServicesSelector } from "@/recoil/selectors";
import { useRecoilValue } from "recoil";
import { ServiceStatus, serviceStatusDetails } from "@/lib/types"; // Adjust import path as needed
import { servicesState } from "@/recoil/atoms";

export function MechanicServiceStatus() {
  const activeServices = useRecoilValue(servicesState);
  if (activeServices.length === 0) {
    return (
      <Card className="w-full border rounded-lg h-72 overflow-auto shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Vehicle Service Status</CardTitle>
          <div className="text-sm text-muted-foreground">N/A</div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-muted-foreground">
            No active services available.
          </div>
        </CardContent>
      </Card>
    );
  }
  const getStatusDetails = (status: ServiceStatus) => {
    return (
      serviceStatusDetails[status] || {
        percentage: 0,
        description: "Unknown status",
      }
    );
  };

  return (
    <Card className="w-full border rounded-lg h-72 overflow-auto">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Vehicle Service Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {activeServices.map((service) => {
            const { percentage, description } = getStatusDetails(
              service.status
            );
            return (
              <div key={service.id} className="border-b border-muted pb-4 mb-4">
                <div className="text-sm">
                  {service.vehicle?.make} {service.vehicle?.model}
                </div>
                <div className="text-sm text-slate-400">
                  {service.serviceType.replace("_"," ")}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Service ID: {service.id}
                  </div>
                  <div className="text-sm font-medium">{service.status}</div>
                </div>
                <Progress value={percentage} className="w-full mt-2" />
                <div className="text-sm text-muted-foreground mt-2">
                  {description}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
