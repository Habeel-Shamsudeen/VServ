"use client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClipboardListIcon } from "../ui/Icons";
import { useInitializeUserData } from "@/hooks";
import { activeServicesSelector } from "@/recoil/selectors";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { servicesState } from "@/recoil/atoms";
import { DeleteButton } from "../ui/delete-button";

export default function CurrService() {
  let { loading } = useInitializeUserData();
  const services = useRecoilValue(activeServicesSelector);
  const setService = useSetRecoilState(servicesState);
  const { toast } = useToast();
  const handleDelete = async (serviceId: number) => {
    try {
      const response = await axios.delete(
        "/api/customer/service",
        {
          headers: { id: serviceId },
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setService((c) => [...c.filter((c) => c.id !== serviceId)]);
      } else {
        toast({
          title: response.data.msg,
          description: "Please Try Again",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "An error occurred",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="border rounded-lg h-72 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Current Service Requests</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {loading && services.length === 0 ? (
            <div className="text-center text-lg">Loading</div>
          ) : services.length === 0 ? (
            <div className="text-center text-lg">No  Services Requested</div>
          ) : (
            ""
          )}
          {services.map((service) => (
            <div className="flex justify-between hover:bg-green-100 rounded-md p-2" key={service.id}>
              <div className="flex items-center gap-4">
              <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                <ClipboardListIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="grid gap-1">
                <div className="font-medium">
                  {service.serviceType.replace("_", " ")}
                </div>
                <div className="text-muted-foreground">
                  {service.vehicle?.year} {service.vehicle?.make}
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col">
            <DeleteButton onDelete={() => handleDelete(service.id)} />
            </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
