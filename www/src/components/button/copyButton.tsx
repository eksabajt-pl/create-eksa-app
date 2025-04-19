import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/PropsWithClassName";
import { Check, Copy, MessageCircleWarning } from "lucide-react";

export default function CopyButton({
  code,
  className,
}: { code: string } & PropsWithClassName) {
  const { status, copyToClipboard } = useCopyToClipboard();

  return (
    <button className={cn(className)}>
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
