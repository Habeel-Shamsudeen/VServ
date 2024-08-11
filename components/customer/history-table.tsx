import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function HistoryTable() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Service History</CardTitle>
        <CardDescription>View your vehicle's service records.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="hidden sm:table-cell">Vehicle</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-05-15</TableCell>
              <TableCell>Oil Change</TableCell>
              <TableCell className="hidden sm:table-cell">2021 Honda Civic</TableCell>
              <TableCell className="text-right">$49.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-03-20</TableCell>
              <TableCell>Tire Rotation</TableCell>
              <TableCell className="hidden sm:table-cell">2021 Honda Civic</TableCell>
              <TableCell className="text-right">$29.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2022-11-10</TableCell>
              <TableCell>Brake Inspection</TableCell>
              <TableCell className="hidden sm:table-cell">2021 Honda Civic</TableCell>
              <TableCell className="text-right">$99.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2022-08-01</TableCell>
              <TableCell>Air Filter Replacement</TableCell>
              <TableCell className="hidden sm:table-cell">2021 Honda Civic</TableCell>
              <TableCell className="text-right">$39.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2022-04-30</TableCell>
              <TableCell>Wiper Blade Replacement</TableCell>
              <TableCell className="hidden sm:table-cell">2021 Honda Civic</TableCell>
              <TableCell className="text-right">$19.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>5</strong> of <strong>10</strong> service records
        </div>
      </CardFooter>
    </Card>
  )
}
