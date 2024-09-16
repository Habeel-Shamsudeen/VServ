import AddVehicleForm from "@/components/customer/addVehicleForm";
import VehicleCard from "@/components/customer/vehicleCard";

export default function CusVehicle(){
    return <div className="grid lg:grid-cols-2 gap-2">
        <AddVehicleForm/>
        <VehicleCard/>
    </div>
}