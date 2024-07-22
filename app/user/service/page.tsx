import CurrService from "@/components/customer/currentService";
import HistoryCard from "@/components/customer/historyCard";
import ServiceReq from "@/components/customer/serviceReqForm";
import { StatusCard } from "@/components/customer/status-card";
import VehicleCard from "@/components/customer/vehicleCard";
import { HistoryTable } from "@/components/history-table";

export default function CustomerService(){
    return <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-5">
            <VehicleCard/>
            <StatusCard/>
            <CurrService/>
        </div>
        <div className="flex flex-col gap-5">
            <ServiceReq/>
            <HistoryTable/>
            
        </div>
        <div>
            
        </div>
    </div>
}