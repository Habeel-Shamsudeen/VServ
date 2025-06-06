import CustomerSignupForm from "@/components/customer/CustomerSignUp";
import Quote from "@/components/shared/Quote";
import RepairIcon from "@/components/ui/RepairIcon";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CustomerSignupPage() {
  const session =await getServerSession(authOptions);
  if (session?.user && session.user?.role === "CUSTOMER") {
    redirect("/user");
  }
  return (
    <div>
      <div className="flex items-center gap-2 p-3 md:bg-slate-100 w-1/2">
        <Link
          href="/#home"
          className="flex items-center gap-2 "
          prefetch={false}
        >
          <RepairIcon className="h-6 w-6" />
          <span className="text-xl font-bold hidden sm:block">VServ</span>
        </Link>
      </div>
      <div className="md:grid grid-cols-2">
        <div className="hidden md:block">
          <Quote />
        </div>
        <div>
          <CustomerSignupForm></CustomerSignupForm>
        </div>
      </div>
    </div>
  );
}
