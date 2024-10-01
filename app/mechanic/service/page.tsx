'use client'
import { MechanicServiceCard } from "@/components/mechanic-service-card";
import { MechanicServiceStatus } from "@/components/mechanic-serviceStatus";
import { useInitializeMechanicData, useInitializeMechanicServices } from "@/hooks";
import { activeServicesSelector } from "@/recoil/selectors";
import { useRecoilValue } from "recoil";

export default function MechanicService(){
    useInitializeMechanicServices();
    useInitializeMechanicData();
    const services = useRecoilValue(activeServicesSelector);
    return <div className="flex-col gap-32">
       <div className="flex justify-center">
       {services.length!==0?(services.map((service)=>(
        <MechanicServiceCard key={service.id} id={service.id} initialStatus={service.status} vehicle={service.vehicle} customerName={service.customer?.user.name || service.customer?.user.email.split('@')[0]}/>
       ))):(
        <div>
            No services assigned
            <br />
        </div>
       )}
       </div>
        <MechanicServiceStatus/>
    </div>
}