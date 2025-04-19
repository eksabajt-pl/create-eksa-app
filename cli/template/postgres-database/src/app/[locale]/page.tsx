import Header from "@/components/header/Header";
import Messages from "@/app/sections/messages";
import Footer from "../sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Messages />
      <div className="sticky top-0">
        <div className="pointer-events-none absolute top-0 left-[50%] z-10 w-full max-w-7xl -translate-x-[50%] border-1 border-y-0 p-4 opacity-[0.5]"></div>
      </div>

      <Footer />
    </div>
  );
}
