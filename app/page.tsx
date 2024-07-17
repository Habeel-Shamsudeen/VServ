import Image from "next/image";
import { AppbarLanding } from "@/components/shared/appbar-landing";
import { LandingPage } from "@/components/shared/landing-page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <AppbarLanding></AppbarLanding>
      <LandingPage></LandingPage>
    </div>
  );
}
