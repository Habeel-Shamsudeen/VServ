"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
export default function CustomerSignupForm() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phno: "",
  });
  const router = useRouter();
  const { toast } = useToast();

  const onClickHandler = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/customer/signup",
        {
          customer,
        }
      );

      if (response.data.status === "success") {
        toast({
          title: response.data.msg,
          description: "Please SignIn to Continue",
        });
        router.push("/auth/customer/signin");
      } else {
        setCustomer(() => ({
          name: "",
          email: "",
          password: "",
          address: "",
          phno: "",
        }));
        toast({
          title: response.data.msg,
          description: "Please Try Again",
        });
      }
    } catch (error) {
      console.error("An error occurred during sign up:", error);
      toast({
        title: "An error occurred during sign up",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="space-y-6 rounded-xl p-10 py-24">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to start using our amazing products and services.
          </p>
        </div>
        <form className="space-y-4" onSubmit={onClickHandler}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...c,
                    name: e.target.value,
                  }))
                }
                value={customer.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...c,
                    email: e.target.value,
                  }))
                }
                value={customer.email}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) =>
                setCustomer((c) => ({
                  ...c,
                  password: e.target.value,
                }))
              }
              value={customer.password}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                required
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...c,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 5555-555555"
                required
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...c,
                    phno: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-slate-500 text-center">
          Already have an account?
          <Link className="pl-1 underline" href={"/auth/customer/signin"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
