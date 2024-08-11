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
interface ServiceForm {
  vehicle:string;
  service:string;
  date:string;
  time: string;
  description: string;
}
export default function ServiceReq() {
  const [service, setService] = useState<ServiceForm>({
    vehicle: "",
    service: "",
    date: "",
    time: "",
    description: "",
  });
  const submitHandler = (service:ServiceForm) => {
    console.log(service);
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
                  key="vehicle"
                  defaultValue="toyota-camry-2019"
                  onValueChange={(e) =>
                    setService((c) => ({
                      ...c,
                      vehicle: e,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota-camry-2019">
                      Toyota Camry 2019
                    </SelectItem>
                    <SelectItem value="honda-civic-2021">
                      Honda Civic 2021
                    </SelectItem>
                    <SelectItem value="ford-f150-2020">
                      Ford F-150 2020
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <Select
                  key="service"
                  defaultValue="oil-change"
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
                    <SelectItem value="oil-change">Oil Change</SelectItem>
                    <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                    <SelectItem value="brake-inspection">
                      Brake Inspection
                    </SelectItem>
                    <SelectItem value="engine-tune-up">
                      Engine Tune-up
                    </SelectItem>
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
                  defaultValue="2023-06-01"
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
                  defaultValue="09:00"
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
