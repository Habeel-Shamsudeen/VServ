"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Lock, Phone, Wrench } from "lucide-react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useSetRecoilState } from "recoil";
import { adminMechanicsState } from "@/recoil/atoms";

const SPECIALITIES = {
  OIL_CHANGE: "Oil Change",
  TIRE_ROTATION: "Tire Rotation",
  BRAKE_INSPECTION: "Brake Inspection",
  BATTERY_REPLACEMENT: "Battery Replacement",
  ENGINE_DIAGNOSTIC: "Engine Diagnostic",
  GENERAL_MAINTENANCE: "General Maintenance",
};

export function MechanicRegistrationForm() {
  const { toast } = useToast();
  const setMechanics = useSetRecoilState(adminMechanicsState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    speciality: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, speciality: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/mechanic",
        {
          mechanic: formData,
        }
      );
      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
        });
        setMechanics((c) => [...c, response.data.mechanic]);
      } else {
        toast({
          title: response.data.msg,
          description: "Please Try Again",
        });
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        speciality: "",
      });
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: `An error occurred`,
        description: `${error}`,
        variant: "destructive",
      });
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex justify-center">
      <Card className="w-full max-w-4xl shadow-xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Register a Mechanic
          </CardTitle>
          <CardDescription className="text-gray-600">
            Join our network of skilled professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="speciality"
                    className="text-sm font-medium text-gray-700"
                  >
                    Speciality
                  </Label>
                  <div className="relative">
                    <Wrench
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Select
                      onValueChange={handleSpecialityChange}
                      value={formData.speciality}
                    >
                      <SelectTrigger className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select a speciality" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SPECIALITIES).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white"
                >
                  Register
                </Button>
              </form>
            </div>
            <div className="hidden md:block">
              <div className="h-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                  <Wrench className="text-green-600" size={100} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
