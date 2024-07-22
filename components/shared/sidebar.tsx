import {
  CalendarIcon,
  CarIcon,
  ClipboardListIcon,
  HomeIcon,
  PlusIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import Link from "next/link";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import RepairIcon from "../ui/RepairIcon";
export default function Sidebar({type}:{type:'user' | 'admin' | 'mechanic'}) {
    const user: string[] = ["home", "history", "service", "vehicle"];
  let typeArr: string[] = [];
  if (type === "user") typeArr = user;


  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-muted border-b h-screen md:border r px-4 py-6 flex-col gap-6 md:px-4 md:py-6 hidden md:flex min-w-52">
          <div className="flex items-center justify-between">
            <Link
              href={`/`}
              className="flex items-center gap-2 "
              prefetch={false}
            >
              <RepairIcon className="h-8 w-8" />
              <span className="text-2xl font-bold hidden sm:block">VSMS</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-3 mt-3">
          {typeArr.map((item) => (
              <Link
                href={`/${type}/${item}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-green-300 hover:text-accent-foreground"
                prefetch={false}
                key={item}
              >
                {item==='home'?<HomeIcon className="h-5 w-5"/> : item==='history'?<CalendarIcon className="h-5 w-5" />: item==='service'?<ClipboardListIcon className="h-5 w-5" />:<CarIcon className="w-6 h-6"/>}
                <span className="text-xl">{item}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetTrigger>
    </Sheet>
  );
}
