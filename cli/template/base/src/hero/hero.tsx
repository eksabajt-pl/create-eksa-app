import Image from "next/image";
import favicon from "@/app/favicon.ico";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookMarked, Github, Globe } from "lucide-react";
import Link from "next/link";
import IncrementButton from "./components/buttons/incrementButton";
import LoveButton from "./components/buttons/loveButton";
import CodeSnippet from "./components/codeSnippet";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Template");
  return (
    <main>
      <svg
        className="absolute inset-0 -z-10 h-full w-full mask-b-from-50% stroke-neutral-800/20"
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
      <Card className="relative grid max-w-3xl gap-4 p-6 md:grid-cols-[12rem_22rem]">
        <Image
          className="col-span-2 row-span-2 place-self-center md:col-span-1"
          width={128}
          height={128}
          src={favicon}
          alt="Eksabajt logo"
        />
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <CodeSnippet code="npm create eksa-app" />
          <p className="flex flex-row gap-2">{t("description")}</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
            <IncrementButton />
            <Button asChild className="col-span-1 cursor-pointer md:col-span-3">
              <Link href="https://github.com/eksabajt-pl/create-eksa-app">
                <Github />
                Github
              </Link>
            </Button>
            <Button asChild className="col-span-1 cursor-pointer md:col-span-3">
              <Link href="#docs">
                <BookMarked /> {t("docs")}
              </Link>
            </Button>
            <Button asChild className="col-span-1 cursor-pointer md:col-span-3">
              <Link href="https://create.eksabajt.pl/">
                <Globe /> {t("landingpage")}
              </Link>
            </Button>
          </div>
        </div>
        <p className="col-span-2 flex flex-row items-center justify-center gap-2 pt-2 text-sm text-nowrap">
          {t("madewith")} <LoveButton /> {t("by")}
        </p>
      </Card>
    </main>
  );
}
