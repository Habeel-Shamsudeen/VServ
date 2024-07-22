import Appbar from "@/components/shared/appbarMain";
import Sidebar from "@/components/shared/sidebar";

export default function UserHome() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <Sidebar type="user"/>
        <div>
          <Appbar type="user" />
        </div>
      </div>
    </div>
  );
}
