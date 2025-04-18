import Header from "@/components/header/Header";
import Hero from "@/app/sections/hero";
import HowItWorks from "../sections/how-it-works";
import Features from "../sections/features";
import FAQ from "../sections/faq";
import Footer from "../sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <div className="sticky top-0">
        <div className="pointer-events-none absolute top-0 left-[50%] z-10 h-screen w-full max-w-7xl -translate-x-[50%] border-1 border-y-0 p-4 opacity-[0.5]"></div>
      </div>
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
