import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Github } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is EKSA App?",
      answer:
        "EKSA App is a modern fullstack Next.js starter template that includes TailwindCSS, Shadcn/UI, Drizzle ORM, Auth.js, and next-intl for internationalization. It provides a solid foundation for building web applications with best practices.",
    },
    {
      question: "Is EKSA App free to use?",
      answer:
        "Yes, EKSA App is completely free and open source. You can use it for personal or commercial projects without any restrictions.",
    },
    {
      question: "Do I need to know all the included technologies?",
      answer:
        "While familiarity with Next.js and React is recommended, EKSA App is designed to be approachable for developers of all skill levels. The documentation provides guides for each included technology.",
    },
    {
      question: "Can I customize the template?",
      answer:
        "EKSA App is designed to be a starting point. You can add, remove, or modify any part of the template to suit your project's needs.",
    },
    {
      question: "How do I deploy an EKSA App project?",
      answer:
        "EKSA App projects can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or your own server. The documentation includes deployment guides for popular platforms.",
    },
  ];

  return (
    <section id="faq" className="flex flex-col items-center border-y-1 py-20">
      <div className="container p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Everything you need to know about create-eksa-app
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button variant="outline" asChild>
            <Link href="https://github.com/eksabajt-pl/create-eksa-app/discussions">
              <Github className="mr-2 h-4 w-4" />
              Join the discussion on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
