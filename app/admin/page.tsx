'use client'
import { AdminDashboardCardComponent } from "@/components/admin-dashboard-card";
import { RevenueCardComponent } from "@/components/revenue-card";
import { useInitializeAdminMechanicsData, useInitializeAdminServicesData } from "@/hooks";

export default function AdminHome(){
    useInitializeAdminMechanicsData();
    useInitializeAdminServicesData()
    return <div className="flex flex-col gap-3">
        <AdminDashboardCardComponent/>
        <RevenueCardComponent/>
    </div>
}