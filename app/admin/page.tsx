'use client'
import { AdminDashboardCardComponent } from "@/components/admin-dashboard-card";
import { MechanicRegistrationForm } from "@/components/mechanic-registration-form";
import { useInitializeAdminMechanicsData, useInitializeAdminServicesData } from "@/hooks";

export default function AdminHome(){
    useInitializeAdminMechanicsData();
    useInitializeAdminServicesData()
    return <div>
        <AdminDashboardCardComponent/>
    </div>
}