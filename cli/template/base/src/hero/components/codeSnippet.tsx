"use client";
import CopyButton from "@/components/button/copyButton";
import { PropsWithClassName } from "@/types/PropsWithClassName";
import { twMerge } from "tailwind-merge";

export default function CodeSnippet({
  code,
  className,
}: { code: string } & PropsWithClassName) {
  return (
    <code
      className={twMerge(
        "bg-secondary relative rounded-sm border-1 p-2 text-2xl font-bold",
        className,
      )}
    >
      <CopyButton
        className="absolute top-[50%] right-3 -translate-y-[50%] cursor-pointer"
        code={code}
      />
      {code}
    </code>
  );
}
