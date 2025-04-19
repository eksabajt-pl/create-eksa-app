import { useTranslations } from "next-intl";
import TextGradient from "@/components/text/textGradient";
import MessageForm from "@/features/messages/forms/MessageForm";
import MessageList from "@/features/messages/lists/MessageList";

export default function Messages() {
  const t = useTranslations("Hero");

  return (
    <main className="flex min-h-screen flex-1 justify-center p-8 pt-[30vh]">
      <svg
        className="absolute inset-0 -z-10 h-full w-full mask-b-from-50% stroke-neutral-500/20 dark:stroke-neutral-800/40"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="230"
            height="230"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 230V.5H230" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        ></rect>
      </svg>
      <div className="relative flex flex-col items-center gap-8">
        <p className="-mb-4 max-w-4xl gap-2 text-center text-6xl font-bold">
          {t("way")
            .split(" ")
            .map((value, index) =>
              value === "APP" ? (
                <TextGradient text={"message book app "} key={index} />
              ) : (
                <span key={index}>{value} </span>
              ),
            )}
        </p>
        <div className="flex w-full max-w-xl flex-col gap-4">
          <MessageForm />
          <MessageList />
        </div>
      </div>
    </main>
  );
}
