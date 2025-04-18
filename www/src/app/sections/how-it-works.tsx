import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("Hero.howitworks");
  const keys = ["01", "02", "03"] as const;

  return (
    <section
      id="how-it-works"
      className="bg-muted/30 flex justify-center border-y-1 py-20"
    >
      <div className="container p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-12">
          {keys.map((key, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-8 md:flex-row"
            >
              <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold">
                {t(key + ".number")}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold">{t(key + ".title")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t(key + ".description")}
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm whitespace-pre-wrap">
                    <code>{t(key + ".code")}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="#docs">
              {t("rtfm")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
