"use client";
import { PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";
import { addMessageAction } from "../actions/message";
import { useFormStatus } from "react-dom";
import { PropsWithClassName } from "@/types/PropsWithClassName";
import { useTranslations } from "next-intl";

export function FormInput({
  name,
  type,
  placeholder,
  className,
}: PropsWithClassName & { name: string; type: string; placeholder: string }) {
  const { pending } = useFormStatus();
  return (
    <Input
      disabled={pending}
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  );
}

export default function MessageForm() {
  const t = useTranslations("Messages");
  return (
    <form
      action={addMessageAction}
      className="mt-8 mb-6 flex w-full max-w-4xl flex-row gap-4"
    >
      <FormInput
        name="author"
        type="text"
        placeholder={t("username")}
        className="flex-1"
      />
      <FormInput
        name="content"
        type="text"
        placeholder={t("message")}
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <PlusCircle className="h-5 w-5 cursor-pointer" />
        <span className="sr-only">Add message</span>
      </Button>
    </form>
  );
}
