'use client';
import CurrService from "@/components/customer/currentService";
import HistoryCard from "@/components/customer/historyCard";
import { StatusCard } from "@/components/customer/status-card";
import VehicleCard from "@/components/customer/vehicleCard";
import { useInitializeUserData } from "@/hooks";

export default function UserHome() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <VehicleCard />
      <CurrService />
      <HistoryCard />
      <StatusCard />
    </div>
  );
}
