'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";

export default function SigninForm({type}:{type:"admin" | "employee" | "customer"}) {
  const [signinInputs, setSigninInputs] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex flex-col justify-center items-center min-w-2xl">
        <div className="space-y-6 rounded-xl p-10 py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Account Log In</h1>
        <p className="text-muted-foreground">
          {type==='customer'?'Login to start using our amazing services.':`Enter your ${type} credentials`}
        </p>
      </div>
      <form className="space-y-2 flex flex-col gap-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={(e)=>{
                setSigninInputs((c)=>({
                    ...c,
                    email:e.target.value
                }))
            }}
            />
          </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required onChange={(e)=>{
                setSigninInputs((c)=>({
                    ...c,
                    password:e.target.value
                }))
            }}/>
        </div>
        <Link href={'/user/'}>
        <Button type="submit" className="w-full">
          Log In
        </Button>
        </Link>
      </form>
      {type!=="admin"?(<div className="text-slate-500 text-center">
        
        Don't have an account?
        <Link
          className="pl-1 underline"
          href={'/auth/customer/signup'}
        >
            Signup
        </Link>
      </div>):''}
    </div>
    </div>
  );
}
