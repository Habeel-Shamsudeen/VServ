'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { servicesState } from "@/recoil/atoms"
import { useRecoilValue } from "recoil"
import { PaymentFormComponent } from "../payment-form"
import { useSession } from "next-auth/react"

export function HistoryTable() {
  const session = useSession()
  const role = session.data?.user.role
  const completedServices = useRecoilValue(servicesState);
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Service History</CardTitle>
        <CardDescription>View your vehicle&apos; service records, status, and dates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead className="hidden sm:table-cell">Vehicle</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedServices.length > 0 ? (
              completedServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{new Date(service.scheduledAt || new Date()).toLocaleDateString()}</TableCell>
                  <TableCell>{service.serviceType.replace("_", " ")}</TableCell>
                  <TableCell>{service.status || "Pending"}</TableCell>
                  <TableCell>{new Date(service.scheduledAt || new Date()).toLocaleDateString()}</TableCell>
                  <TableCell>{service.completedAt ? new Date(service.completedAt).toLocaleDateString() : "Ongoing"}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {`${service.vehicle?.year} ${service.vehicle?.make} ${service.vehicle?.model}`}
                  </TableCell>
                  <TableCell className="text-right">
                  {service.cost && !service.paid && role==='CUSTOMER' ? <PaymentFormComponent id={service.id} cost={Number(service.cost.toFixed(2))}/> :service.paid? `$${service.cost.toFixed(2)} paid`:service.cost?`$${service.cost.toFixed(2)}`:"Not yet fixed"}
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No service records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{completedServices.length}</strong> of <strong>{completedServices.length}</strong> service records
        </div>
      </CardFooter>
    </Card>
  )
}
