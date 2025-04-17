import Hero from "@/hero/hero";
import ThemeToggle from "@/theme/components/themeToggle";
import LanguageDropdown from "@/i18n/components/buttons/languageDropdown";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center p-4 sm:p-16 md:p-24">
      <Hero />
      <div className="absolute top-4 right-4 flex flex-row gap-4">
        <LanguageDropdown />
        <ThemeToggle />
      </div>
    </div>
  );
}
