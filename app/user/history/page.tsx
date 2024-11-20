'use client'
import { HistoryTable } from "@/components/customer/history-table";
import { useInitializeUserData } from "@/hooks";
export default function HistoryPageCustomer() {
  useInitializeUserData();
  return (
    <div>
      <HistoryTable/>
    </div>
  );
}
