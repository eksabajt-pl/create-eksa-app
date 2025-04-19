import { Globe, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SiDrizzle,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function Features() {
  const t = useTranslations("Hero.features");
  const features = [
    {
      key: "tw",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-300 text-blue-400">
          <SiTailwindcss size={24} />
        </div>
      ),
    },
    {
      key: "shadcnui",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
          <SiShadcnui />
        </div>
      ),
    },
    {
      key: "drizzle",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800 text-yellow-200">
          <SiDrizzle size={24} />
        </div>
      ),
    },
    {
      key: "authjs",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 text-green-500">
          <Shield fill="rgb(3, 200, 81)" />
        </div>
      ),
    },
    {
      key: "nextintl",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500">
          <Globe />
        </div>
      ),
    },
    {
      key: "ts",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center overflow-clip rounded-lg bg-white text-blue-700">
          <SiTypescript size={64} />
        </div>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center border-t-1 py-20"
    >
      <div className="container flex flex-col items-center p-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {t("description")}
          </p>
        </div>
        <div className="grid max-w-7xl grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-lg border p-6 shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">
                {t(feature.key + ".title")}
              </h3>
              <p className="text-muted-foreground">
                {" "}
                {t(feature.key + ".description")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
