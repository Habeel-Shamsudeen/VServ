import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RepairIcon from "../ui/RepairIcon";
import SidebarButton from "../ui/sidebarbutton";
import { LogOutIcon, UserIcon } from "../ui/Icons";

export default function Appbar({
  type,
}: {
  type: "landing" | "user" | "mechanic" | "admin";
}) {
  return (
    <header className="bg-background border-b px-4 py-4 flex items-center justify-between shrink-0 md:px-6 md:py-4">
          <div className="flex items-center gap-4">
        <Link
          href={`/${type}`}
          className="flex items-center gap-2 md:hidden"
          prefetch={false}
        >
            <RepairIcon/>
        <span className="text-xl font-semibold hidden sm:block">VSMS</span>
        </Link>
        <div className="hidden md:block">
            Customer
        </div>
      </div>
      <div className="flex gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border-2">
              <Avatar className="h-10 w-10 bg-[#333] border-2 hover:border-primary rounded-full">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/${type}/profile`}
                className="flex items-center gap-2"
                prefetch={false}
              >
                <UserIcon className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarButton type={`${type}`} />
      </div>
    </header>
  );
}
