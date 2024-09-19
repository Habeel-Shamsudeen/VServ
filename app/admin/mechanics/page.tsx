'use client'
import { MechanicRegistrationForm } from "@/components/mechanic-registration-form";
import { MechanicsCardsComponent } from "@/components/mechanics-cards";
import { useInitializeAdminMechanicsData } from "@/hooks";

export default function AdminMechanicPage(){
    useInitializeAdminMechanicsData();
    return <div className="flex flex-col gap-3">
        <MechanicRegistrationForm/>
        <MechanicsCardsComponent/>
    </div>
}