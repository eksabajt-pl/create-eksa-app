import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create your project",
      description:
        "Run the create command and follow the interactive prompts to set up your project",
      code: "npm create eksa-app@latest",
    },
    {
      number: "02",
      title: "Configure your stack",
      description:
        "Choose your database, authentication provider, and other options",
      code: "✓ What would you like to use?\n  ✓ PostgreSQL with Drizzle\n  ✓ Auth.js for authentication\n  ✓ next-intl for i18n",
    },
    {
      number: "03",
      title: "Start developing",
      description:
        "Navigate to your project directory and start the development server",
      code: "cd my-app\nnpm run dev",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-muted/30 flex justify-center border-y-1 py-20"
    >
      <div className="container p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Get up and running in minutes with a fully configured Next.js
            application
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-8 md:flex-row"
            >
              <div className="bg-primary/10 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-sm whitespace-pre-wrap">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="#docs">
              Read the documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
