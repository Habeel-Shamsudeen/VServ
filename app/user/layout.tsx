import Appbar from "@/components/shared/appbarMain";
import Sidebar from "@/components/shared/sidebar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
            <Sidebar type="user" />
            <div>
                <Appbar type="user" />
                <div className="p-4 grid gap-6 flex-1 overflow-auto md:p-6">
                    {children}
                </div>
            </div>
        </div>
      </>
    )
  }