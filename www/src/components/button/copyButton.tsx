import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { PropsWithClassName } from "@/types/PropsWithClassName";
import { Check, Copy, MessageCircleWarning } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function CopyButton({
  code,
  className,
}: { code: string } & PropsWithClassName) {
  const { status, copyToClipboard } = useCopyToClipboard();

  return (
    <button className={twMerge(className)}>
      {status === "idle" ? (
        <Copy onClick={() => copyToClipboard(code)} />
      ) : status === "success" ? (
        <Check />
      ) : status === "error" ? (
        <MessageCircleWarning />
      ) : null}
    </button>
  );
}
