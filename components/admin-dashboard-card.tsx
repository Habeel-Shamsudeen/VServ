'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminMechanicsState, servicesState } from "@/recoil/atoms"
import { completedServicesSelector, onGoingServicesSelector, unassignedServicesSelector, unassignMechanicsSelector } from "@/recoil/selectors"
import { WrenchIcon, UsersIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon, UserPlusIcon } from "lucide-react"
import { useRecoilValue } from "recoil"

export function AdminDashboardCardComponent() {
  const totalServices = useRecoilValue(servicesState).length;
  const completedServices = useRecoilValue(completedServicesSelector).length;
  const ongoingServices = useRecoilValue(onGoingServicesSelector).length;
  const unassignedServices = useRecoilValue(unassignedServicesSelector).length;
  const totalMechanics = useRecoilValue(adminMechanicsState).length;
  const freeMechanics = useRecoilValue(unassignMechanicsSelector).length;
  const maxValue = totalServices

  return (
    <Card className="w-full max-w-7xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatItem icon={WrenchIcon} label="Total Services" value={totalServices} />
            <StatItem icon={UsersIcon} label="Total Mechanics" value={totalMechanics} />
            <StatItem icon={CheckCircleIcon} label="Completed Services" value={completedServices} />
            <StatItem icon={ClockIcon} label="Ongoing Services" value={ongoingServices} />
            <StatItem icon={AlertCircleIcon} label="Unassigned Services" value={unassignedServices} />
            <StatItem icon={UserPlusIcon} label="Free Mechanics" value={freeMechanics} />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Services Overview</h3>
            <div className="space-y-4">
              <BarChartItem label="Completed" value={completedServices} maxValue={maxValue} color="bg-green-500" />
              <BarChartItem label="Ongoing" value={ongoingServices} maxValue={maxValue} color="bg-blue-500" />
              <BarChartItem label="Unassigned" value={unassignedServices} maxValue={maxValue} color="bg-red-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ icon: Icon, label, value }:any) {
  return (
    <div className="flex items-center space-x-2 bg-muted/50 p-4 rounded-lg">
      <Icon className="h-6 w-6 text-primary" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function BarChartItem({ label, value, maxValue, color }:any) {
  const percentage = (value / maxValue) * 100
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-muted-foreground">{value}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}