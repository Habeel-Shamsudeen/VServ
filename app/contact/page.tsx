import { AppbarLanding } from "@/components/appbar-landing";
import { ContactPage } from "@/components/contact-page";

export default function Contact(){
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <AppbarLanding></AppbarLanding>
            <ContactPage></ContactPage>
        </div>
    )
}