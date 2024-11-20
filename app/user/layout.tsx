import Appbar from "@/components/shared/appbarMain";
import Sidebar from "@/components/shared/sidebar";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import { useInitializeUserData } from "@/hooks";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session =await getServerSession(authOptions);
  if (!session?.user || !(session.user?.role === "CUSTOMER")) {
    redirect("/");
  }
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
            <Sidebar type="user" />
            <div>
                <Appbar type="user" user={session.user}/>
                <div className="p-4 grid gap-6 flex-1 overflow-auto md:p-6">
                    {children}
                </div>
            </div>
        </div>
      </>
    )
  }