"use client";
import { Card,CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VehicleForm {
  customerId: string;
  make: string;
  model: string;
  year: string;
}

export default function AddVehicleForm({ customerId }: { customerId: string }) {
  const [vehicle, setVehile] = useState<VehicleForm>({
    customerId,
    make: "",
    model: "",
    year: "",
  });
  const submitHandler = (vehicle: VehicleForm) => {
    console.log(vehicle);
  };
  return (
    <div className="border rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Add new vehicle</h1>
      <Card className="">
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="vehicle">Make</Label>
              <Input
                onChange={(e) =>
                  setVehile((c) => ({
                    ...c,
                    make: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="service">Model</Label>
              <Input
                onChange={(e) =>
                  setVehile((c) => ({
                    ...c,
                    model: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <div>
                <Label htmlFor="date">Year</Label>
                <Input
                  defaultValue={"2024"}
                  onChange={(e) =>
                    setVehile((c) => ({
                      ...c,
                      year: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => submitHandler(vehicle)}
            >
              Add Vehicle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
