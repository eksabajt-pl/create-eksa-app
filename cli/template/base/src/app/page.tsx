import Hero from "@/features/hero/hero";
import ThemeToggle from "@/features/theme/components/themeToggle";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center p-4 sm:p-16 md:p-24">
      <Hero />
      <ThemeToggle className="absolute top-4 right-4" />
    </div>
  );
}
