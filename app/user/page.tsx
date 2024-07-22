import CurrService from "@/components/customer/currentService";
import HistoryCard from "@/components/customer/historyCard";
import { StatusCard } from "@/components/customer/status-card";
import VehicleCard from "@/components/customer/vehicleCard";
import Appbar from "@/components/shared/appbarMain";
import Sidebar from "@/components/shared/sidebar";

export default function UserHome() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar type="user"/>
        <div>
          <Appbar type="user" />
          <div className="p-4 grid gap-6 flex-1 overflow-auto md:p-6">
          <div className="grid gap-10 md:grid-cols-2">
            <VehicleCard/>
            <CurrService/>
            <HistoryCard/>
            <StatusCard/>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
