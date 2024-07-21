"use client";
import Appbar from "@/components/shared/appbarMain";
import {
  CalendarIcon,
  ClipboardListIcon,
  HomeIcon,
  PlusIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import RepairIcon from "@/components/ui/RepairIcon";

export default function UserHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-1 h-screen md:grid-cols-[auto_1fr]">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <div className="bg-muted border-b md:border-r px-4 py-6 flex-col gap-6 md:px-4 md:py-6 hidden md:flex">
              <div className="flex items-center justify-between">
                <Link
                  href={`/`}
                  className="flex items-center gap-2 "
                  prefetch={false}
                >
                  <RepairIcon className="h-8 w-8" />
                  <span className="text-2xl font-bold hidden sm:block">
                    VSMS
                  </span>
                </Link>
              </div>
              <nav className="flex flex-col gap-2 mt-3">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-green-300 hover:text-accent-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-green-300 hover:text-accent-foreground"
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>History</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-green-300 hover:text-accent-foreground"
                  prefetch={false}
                >
                  <ClipboardListIcon className="h-5 w-5" />
                  <span>Service Requests</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Vehicle</span>
                </Link>
              </nav>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="md:static md:block">
            <div className="bg-muted border-b md:border-r px-4 py-6 flex-col gap-6 md:px-4 md:py-6 hidden md:flex">
              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="flex items-center gap-2 font-semibold"
                  prefetch={false}
                >
                  <WrenchIcon className="h-6 w-6" />
                  <span>Acme Auto</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>History</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  <ClipboardListIcon className="h-5 w-5" />
                  <span>Service Requests</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Vehicle</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div>
          <Appbar type="user" />
        </div>
      </div>
    </div>
  );
}
