"use client";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useIncrement from "@/features/hero/hooks/useIncrement";

export default function IncrementButton() {
  const { optimisticCounter, incrementAction } = useIncrement();
  return (
    <Button
      onClick={incrementAction}
      className="col-span-2 cursor-pointer md:col-span-3"
    >
      {optimisticCounter < 0 ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <PlusCircle />
          Clicked {optimisticCounter} times
        </>
      )}
    </Button>
  );
}
