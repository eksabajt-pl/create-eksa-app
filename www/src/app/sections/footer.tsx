import { Link } from "@/i18n/navigation";
import favicon from "@/app/favicon.ico";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="flex flex-col items-center border-t py-12">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold"
            >
              <Image height={32} alt="Eksabajt.pl favicon" src={favicon} />
              <span>create-eksa-app</span>
            </Link>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Components
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted-foreground mt-12 -mb-6 pt-8 text-center">
          <div className="absolute left-0 mt-8 w-full -translate-y-16 border-t"></div>
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
