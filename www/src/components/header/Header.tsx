"use client";
import ThemeToggle from "@/theme/components/themeToggle";
import LanguageDropdown from "@/i18n/components/buttons/languageDropdown";
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import favicon from "@/app/favicon.ico";
import { Link } from "@/i18n/navigation";
import { Github } from "lucide-react";
export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const updateScroll = useCallback(
    () => setScrollY(window.scrollY),
    [setScrollY],
  );
  useEffect(() => {
    addEventListener("scroll", updateScroll);
    return () => removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  const isFloating = useMemo(() => scrollY > 0, [scrollY]);

  return (
    <div
      className={twMerge(
        "fixed top-0 z-10 flex h-24 w-full flex-row justify-center gap-4 backdrop-blur-none transition-[height,border,backdrop-blur] duration-300",
        isFloating && "bg-background/50 h-16 border-b-1 backdrop-blur-md",
      )}
    >
      <div className="flex w-full max-w-7xl flex-row justify-between gap-4 px-4">
        <Image
          height={32}
          width={32}
          className="object-contain"
          alt="Eksabajt icon"
          src={favicon}
        />
        <div className="flex flex-row items-center">
          <LanguageDropdown />
          <ThemeToggle />
          <Link
            href="https://github.com/eksabajt-pl/create-eksa-app"
            className={twMerge("cursor-pointer p-4")}
          >
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
}
