import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("Hero.faqs");
  const keys = [
    "what",
    "free",
    "technologies",
    "customization",
    "deployment",
  ] as const;

  return (
    <section id="faq" className="flex flex-col items-center border-y-1 py-20">
      <div className="container p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {keys.map((key, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {t(key + ".question")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(key + ".answer")}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">{t("questions")}</p>
          <Button variant="outline" asChild>
            <Link href="https://github.com/eksabajt-pl/create-eksa-app/discussions">
              <Github className="mr-2 h-4 w-4" />
              {t("discussion")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
