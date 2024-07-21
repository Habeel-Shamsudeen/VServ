import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import RepairIcon from "./RepairIcon";
import Link from "next/link";
export default function SidebarButton({
  type,
}: {
  type: "landing" | "user" | "mechanic" | "admin";
}) {
  const landing: string[] = ["service", "about", "contact"];
  const user: string[] = ["", "history", "services", "vehicle"];
  let typeArr: string[] = [];
  if (type === "landing") typeArr = landing;
  if (type === "user") typeArr = user;

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <RepairIcon className="h-5 w-5" />
              <span className="text-lg font-bold">Vehicle Service</span>
            </Link>
            {typeArr.map((item) => (
              <Link
                href={type === "landing" ? `#${item}` : `/${type}/${item}`}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
