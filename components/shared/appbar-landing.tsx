import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import RepairIcon from "../ui/RepairIcon"
import SidebarButton from "../ui/sidebarbutton"

export function AppbarLanding() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background border-b-2 border-slate-50 px-4 md:px-6 fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/#home" className="flex items-center gap-2 " prefetch={false}>
          <RepairIcon className="h-6 w-6" />
          <span className="text-xl font-bold hidden sm:block">VServ</span>
        </Link>
      </div>
      <nav className="hidden items-center gap-4 md:flex">
        <Link href="/#service" className="text-md font-medium text-muted-foreground hover:text-foreground hover:underline" prefetch={false}>
          Services
        </Link>
        <Link href="/#about" className="text-md font-medium text-muted-foreground hover:text-foreground hover:underline" prefetch={false}>
          About
        </Link>
        <Link href="/contact" className="text-md font-medium text-muted-foreground hover:text-foreground hover:underline" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="flex gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8 bg-[#333]">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          <Link href={'/auth/admin/signin'}><DropdownMenuItem>Admin</DropdownMenuItem></Link>
          <Link href={'/auth/mechanic/signin'}><DropdownMenuItem>Mechanic</DropdownMenuItem></Link>
          <Link href={'/auth/customer/signin'}><DropdownMenuItem>Customer</DropdownMenuItem></Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarButton type="landing"/>
        
      </div>
    </header>
  )
}
