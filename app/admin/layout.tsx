import Appbar from "@/components/shared/appbarMain";
import Sidebar from "@/components/shared/sidebar";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !(session.user?.role === "ADMIN")) {
    redirect("/");
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar type="admin" />
        <div>
          <Appbar type="admin" />
          <div className="p-4 grid gap-6 flex-1 overflow-auto md:p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
