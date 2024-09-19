"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useRecoilValue } from "recoil"
import { servicesState } from "../recoil/atoms"
import { useEffect, useState } from "react"

// Helper function to format date to month name
const getMonthName = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)
}

export function RevenueCardComponent() {
  const services = useRecoilValue(servicesState) // Get services data from Recoil state
  const [chartData, setChartData] = useState<any[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalServices, setTotalServices] = useState(0)

  useEffect(() => {
    if (services.length > 0) {
      // Process the services to group by month and calculate revenue
      const revenueByMonth: { [key: string]: { month: string; revenue: number; servicesCount: number } } = {}

      services.forEach((service: any) => {
        if (service.completedAt) {
          const monthName = getMonthName(new Date(service.completedAt))

          if (!revenueByMonth[monthName]) {
            revenueByMonth[monthName] = {
              month: monthName,
              revenue: 0,
              servicesCount: 0,
            }
          }

          revenueByMonth[monthName].revenue += service.cost || 0
          revenueByMonth[monthName].servicesCount += 1
        }
      })

      const formattedData = Object.values(revenueByMonth)
      const totalRev = formattedData.reduce((sum, item) => sum + item.revenue, 0)
      const totalServ = formattedData.reduce((sum, item) => sum + item.servicesCount, 0)

      setChartData(formattedData)
      setTotalRevenue(totalRev)
      setTotalServices(totalServ)
    }
  }, [services])

  return (
    <Card className="w-full max-w-7xl border">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Completed Services</h3>
            <p className="text-3xl font-bold">{totalServices}</p>
          </div>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}