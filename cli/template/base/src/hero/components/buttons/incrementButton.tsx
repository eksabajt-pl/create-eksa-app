"use client";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useIncrement from "@/hero/hooks/useIncrement";
import { useTranslations } from "next-intl";

export default function IncrementButton() {
  const t = useTranslations("Template");
  const { optimisticCounter, incrementAction } = useIncrement();
  return (
    <Button
      onClick={incrementAction}
      className="col-span-1 cursor-pointer md:col-span-3"
    >
      {optimisticCounter < 0 ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <PlusCircle />
          {t("count", { count: optimisticCounter })}
        </>
      )}
    </Button>
  );
}
