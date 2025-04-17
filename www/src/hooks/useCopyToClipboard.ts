import { useCallback, useEffect, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

export default function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
          setStatus("success");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          setStatus("error");
        });
    },
    [setStatus],
  );

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return { copyToClipboard, status };
}
