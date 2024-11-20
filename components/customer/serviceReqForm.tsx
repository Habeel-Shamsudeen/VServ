"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { servicesState, vehiclesState } from "@/recoil/atoms";
import { ServiceType } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useInitializeUserData } from "@/hooks";
interface ServiceForm {
  vehicleId: string;
  service: string;
  date: string;
  time: string;
  description: string;
}
export default function ServiceReq() {
  const [service, setService] = useState<ServiceForm>({
    vehicleId: "",
    service: "",
    date: "",
    time: "",
    description: "",
  });
  const { toast } = useToast();
  const vehicles = useRecoilValue(vehiclesState);
  const setRecoilService = useSetRecoilState(servicesState);
  const submitHandler =async (service: ServiceForm) => {
    const { date, time } = service;
    let schedule;
    if (date && time) {
      const scheduledAt = new Date(`${date}T${time}:00`);
      schedule = scheduledAt
    }
    try {
      const response = await axios.post("/api/customer/service",{
        vehicleId:service.vehicleId,
        scheduledAt:schedule,
        serviceType:service.service,
        description:service.description
      })
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        // update service state
        setRecoilService((c)=>[...c,response.data.service])
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
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };
  return (
    <div className="border rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Request New Service</h1>
      <Card className="">
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select
                  required
                  onValueChange={(e) =>
                    setService((c) => ({
                      ...c,
                      vehicleId: e,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem value={vehicle.id+""} key={vehicle.id}>
                        {vehicle.make} {vehicle.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <Select
                  required
                  onValueChange={(e) =>
                    setService((c) => ({
                      ...c,
                      service: e,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ServiceType).map((service) => (
                      <SelectItem key={service} value={service}>
                        {service.replace("_", " ")}{" "}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  min={getTodayDate()}
                  onChange={(e) =>
                    setService((c) => ({
                      ...c,
                      date: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  id="time"
                  onChange={(e) =>
                    setService((c) => ({
                      ...c,
                      time: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes"
                onChange={(e) =>
                  setService((c) => ({
                    ...c,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => submitHandler(service)}
            >
              Request Service
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
