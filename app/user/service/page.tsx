import CurrService from "@/components/customer/currentService";
import ServiceReq from "@/components/customer/serviceReqForm";
import { StatusCard } from "@/components/customer/status-card";
import VehicleCard from "@/components/customer/vehicleCard";
import { HistoryTable } from "@/components/customer/history-table";

export default function CustomerService() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <ServiceReq />
        <VehicleCard />
        <CurrService />
      </div>
      <div className="flex flex-col gap-5">
        <StatusCard />
        <HistoryTable />
      </div>
      <div></div>
    </div>
  );
}
