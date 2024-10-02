"use client";
import { Card,CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { vehiclesState } from "@/recoil/atoms";


interface VehicleForm {
  make: string;
  model: string;
  year: number;
}

export default function AddVehicleForm() {
  const [vehicle, setVehile] = useState<VehicleForm>({
    make: "",
    model: "",
    year: 2024,
  });
  const setVehicle = useSetRecoilState(vehiclesState);
  const { toast } = useToast();

  const onClickHandler = async (event: any) => {
    event.preventDefault();
    try {
      if(vehicle.make.length<=1 || vehicle.model.length<=1){
        throw new Error('Invalid Model or Make length')
      }
      const response = await axios.post(
        "/api/customer/vehicle",
        {
          vehicle,
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setVehicle((c)=>[...c,response.data.vehicle])
      } else {
        toast({
          title: response.data.msg,
          description: "Please Try Again",
        });
      }
      setVehile(() => ({
        make: "",
        model: "",
        year: 2024,
      }));
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: `An error occurred`,
        description: `${error}`,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="border rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Add new vehicle</h1>
      <Card className="">
        <CardContent>
          <form onSubmit={onClickHandler}>
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
                value={vehicle.make}
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
                value={vehicle.model}
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
                      year: parseInt(e.target.value),
                    }))
                  }
                  value={vehicle.year}
                  required
                />
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              type="submit"
            >
              Add Vehicle
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
