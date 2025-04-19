"use client";
import useMounted from "@/hooks/useMounted";
import { PropsWithClassName } from "@/types/PropsWithClassName";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export default function ThemeToggle({ className }: PropsWithClassName) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [setTheme, resolvedTheme]);

  if (!mounted) {
    return (
      <div className="p-4">
        <SunMoon />
      </div>
    );
  }
  return (
    <button
      onClick={toggleTheme}
      className={twMerge("cursor-pointer p-4", className)}
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
