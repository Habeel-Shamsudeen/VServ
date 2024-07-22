import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClipboardListIcon } from "../ui/Icons";

export default function CurrService(){
    return <div className="border rounded-lg h-72 overflow-auto">
        <Card>
              <CardHeader>
                <CardTitle>Current Service Requests</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <ClipboardListIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Oil Change</div>
                    <div className="text-muted-foreground">2022 Honda Civic</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <ClipboardListIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Oil Change</div>
                    <div className="text-muted-foreground">2022 Honda Civic</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <ClipboardListIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Tire Rotation</div>
                    <div className="text-muted-foreground">2018 Toyota Corolla</div>
                  </div>
                </div>
              </CardContent>
            </Card>
    </div>
}