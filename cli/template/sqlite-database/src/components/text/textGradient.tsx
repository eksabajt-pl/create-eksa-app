import { PropsWithClassName } from "@/types/PropsWithClassName";

export default function TextGradient({
  text,
}: PropsWithClassName & { text: string }) {
  return (
    <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text pb-4 font-bold text-transparent">
      {text}
    </span>
  );
}
