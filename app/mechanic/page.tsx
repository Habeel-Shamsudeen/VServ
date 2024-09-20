'use client'
import { MechanicProfileCard } from "@/components/mechanic-profile-card";
import { TotalEarningsCard } from "@/components/total-earnings-card";
import { TotalServicesCard } from "@/components/total-services-card";
import { useInitializeMechanicData, useInitializeMechanicServices } from "@/hooks";

export default function MechanicHome() {
    useInitializeMechanicData()
    useInitializeMechanicServices()
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <MechanicProfileCard/>
        <TotalServicesCard/>
        <TotalEarningsCard/>
      </div>
    </div>
  );
}
