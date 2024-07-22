import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function VehicleCard(){
    return <div className="border rounded-lg h-72 overflow-auto">
        <Card>
    <CardHeader>
      <CardTitle>Your Vehicles</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center gap-4 p-1 hover:bg-accent">
        <img src="/placeholder.svg" width={75} height={75} alt="Vehicle" className="rounded-md" />
        <div className="grid gap-1">
          <div className="font-medium">2018 Toyota Corolla</div>
          <div className="text-muted-foreground">XYZ 456</div>
        </div>
      </div>
      <div className="flex items-center gap-4  p-1 hover:bg-accent">
        <img src="/placeholder.svg" width={75} height={75} alt="Vehicle" className="rounded-md" />
        <div className="grid gap-1">
          <div className="font-medium">2018 Toyota Corolla</div>
          <div className="text-muted-foreground">XYZ 456</div>
        </div>
      </div>
    </CardContent>
  </Card>
    </div>
}