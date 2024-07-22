import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function StatusCard() {
  return (
    <Card className="w-full border rounded-lg h-72">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Vehicle Service Status</CardTitle>
        <div className="text-sm text-muted-foreground">2023 Honda Civic</div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Current Stage</div>
            <div className="text-sm font-medium">Inspection</div>
          </div>
          <Progress value={60} className="w-full" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Estimated Completion</div>
            <div className="text-sm font-medium">2:45 PM</div>
          </div>
          <div className="text-sm text-muted-foreground">
            The technician is currently inspecting the vehicle and will provide an update shortly.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
