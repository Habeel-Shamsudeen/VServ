'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";

export default function CustomerSignupForm() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phno: "",
  });
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <div className="space-y-6 rounded-xl p-10 py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">
          Sign up to start using our amazing products and services.
        </p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required onChange={(e)=>{
                setCustomer((c)=>({
                    ...c,
                    name:e.target.value
                }))
            }}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={(e)=>{
                setCustomer((c)=>({
                    ...c,
                    email:e.target.value
                }))
            }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required onChange={(e)=>{
                setCustomer((c)=>({
                    ...c,
                    password:e.target.value
                }))
            }}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
          <Label htmlFor="address"> Address</Label>
          <Input id="address" placeholder="123 Main St" required onChange={(e)=>{
                setCustomer((c)=>({
                    ...c,
                    street:e.target.value
                }))
            }}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 5555-555555"
              required
              onChange={(e)=>{
                setCustomer((c)=>({
                    ...c,
                    phno:e.target.value
                }))
            }}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <div className="text-slate-500 text-center">
        
            Already have an account?
            <Link
              className="pl-1 underline"
              href={'/auth/customer/signin'}
            >
                Login
            </Link>
          </div>
    </div>
    </div>
    
  );
}
