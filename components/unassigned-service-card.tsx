"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ClipboardListIcon,
  ClockIcon,
  FileTextIcon,
  AlertCircleIcon,
} from "lucide-react";
import { AssignServiceComponent } from "./assign-service";
import { useRecoilValue } from "recoil";
import { unassignedServicesSelector } from "@/recoil/selectors";
import { useInitializeAdminMechanicsData } from "@/hooks";

const formatDate = (dateString: any) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}


export function UnassignedServiceCard() {
  useInitializeAdminMechanicsData();
  const servicesToRender = useRecoilValue(unassignedServicesSelector)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Unassigned Services</h1>
      {servicesToRender.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesToRender.map((service) => (
            <TooltipProvider>
              <Card
                className="w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-lg border"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CardHeader className="relative">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      Service ID: {service.id}
                    </CardTitle>
                    <Badge variant="outline">{service.id}</Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isHovered ? "animate-ping" : ""
                      } bg-orange-500`}
                    />
                    Awaiting assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <ClipboardListIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{service.serviceType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-primary" />
                    <span>{formatDate(service.scheduledAt)}</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-start space-x-2">
                        <FileTextIcon className="w-4 h-4 text-primary mt-1" />
                        <p className="text-sm text-muted-foreground truncate">
                          {service.description}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{service.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <AssignServiceComponent serviceId={service.id}/>
                </CardFooter>
              </Card>
            </TooltipProvider>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No unassigned services at the moment.
        </p>
      )}
    </div>
  );
}
