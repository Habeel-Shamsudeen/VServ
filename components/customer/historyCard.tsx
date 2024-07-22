import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function HistoryCard(){
    return <div className="border rounded-lg h-72 overflow-hidden">
        <Card>
              <CardHeader>
                <CardTitle>Vehicle History</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" width={75} height={75} alt="Vehicle" className="rounded-md" />
                  <div className="grid gap-1">
                    <div className="font-medium">2022 Honda Civic</div>
                    <div className="text-muted-foreground">
                      <div>Oil Change - 05/01/2023</div>
                      <div>Tire Rotation - 03/15/2023</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" width={75} height={75} alt="Vehicle" className="rounded-md" />
                  <div className="grid gap-1">
                    <div className="font-medium">2018 Toyota Corolla</div>
                    <div className="text-muted-foreground">
                      <div>Brake Inspection - 06/20/2022</div>
                      <div>Air Filter Replacement - 04/10/2022</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    </div>
}