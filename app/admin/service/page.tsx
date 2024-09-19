'use client'
import { UnassignedServiceCard } from "@/components/unassigned-service-card";
import { useInitializeAdminMechanicsData, useInitializeAdminServicesData } from "@/hooks";

export default function AdminService(){
    useInitializeAdminMechanicsData();
    useInitializeAdminServicesData();
    return <div>
        <UnassignedServiceCard/>
    </div>
}