"use client";
import { useInitializeUserData } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { vehiclesState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function VehicleCard() {
  useInitializeUserData();
  const vehicles = useRecoilValue(vehiclesState);
  return (
    <div className="border rounded-lg h-72 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {vehicles.length === 0?<div className="text-center text-lg">No vehicles added</div>:''}
          {vehicles.map((vehicle) => (
            <div className="flex items-center gap-4 p-1 hover:bg-accent">
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
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
