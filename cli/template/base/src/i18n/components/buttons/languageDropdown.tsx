"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { Locale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
export default function LanguageDropdown() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const { locale } = params;
  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }
  const { locales } = routing;
  const t = useTranslations("LanguageDropdown");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} className="cursor-pointer">
        <LanguagesIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t(`choose`)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={locale as Locale}
          onValueChange={onSelectChange}
        >
          {locales.map((locale, index) => (
            <DropdownMenuRadioItem value={locale} key={index}>
              <span className="font-bold">{locale.toUpperCase()}</span>
              {new Intl.DisplayNames([locale as Locale], {
                type: "language",
              }).of(locale.toUpperCase())}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
