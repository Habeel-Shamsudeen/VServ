import { AppbarLanding } from "@/components/shared/appbar-landing";
import { ContactPage } from "@/components/shared/contact-page";

export default function Contact(){
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <AppbarLanding></AppbarLanding>
            <ContactPage></ContactPage>
        </div>
    )
}