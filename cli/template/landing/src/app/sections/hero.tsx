import { Button } from "@/components/ui/button";
import { BookMarked, Github } from "lucide-react";
import Link from "next/link";
import CodeSnippet from "../../components/ui/code-snippet";
import { useTranslations } from "next-intl";
import TextGradient from "@/components/text/textGradient";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center p-8">
      <svg
        className="absolute inset-0 -z-10 h-full w-full mask-b-from-50% stroke-neutral-500/20 dark:stroke-neutral-800/40"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="230"
            height="230"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 230V.5H230" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        ></rect>
      </svg>
      <div className="relative flex flex-col items-center gap-8">
        <p className="-mb-4 max-w-4xl gap-2 text-center text-6xl font-bold">
          {t("way")
            .split(" ")
            .map((value, index) =>
              value === "APP" ? (
                <TextGradient text={"fullstack next.js app "} key={index} />
              ) : (
                <span key={index}>{value} </span>
              ),
            )}
        </p>
        <p className="max-w-2xl text-center text-2xl">
          {" "}
          {t("featuring")} tailwindcss, shadcn/ui, drizzle, auth.js, next-intl
        </p>
        <div className="flex max-w-3xl flex-col items-center">
          <div className="flex flex-col gap-4">
            <CodeSnippet code="npm create eksa-app@latest" />{" "}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                size={"lg"}
                asChild
                className="col-span-1 cursor-pointer text-lg"
              >
                <Link href="#docs">
                  <BookMarked /> {t("docs")}
                </Link>
              </Button>
              <Button
                variant={"secondary"}
                asChild
                size={"lg"}
                className="col-span-1 cursor-pointer text-lg"
              >
                <Link href="https://github.com/eksabajt-pl/create-eksa-app">
                  <Github />
                  Github
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
