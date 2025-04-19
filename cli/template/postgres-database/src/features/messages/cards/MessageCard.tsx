"use client";
import { Card } from "@/components/ui/card";
import { messages } from "@/db/schema/message";
import { Clock, User } from "lucide-react";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";

export default function MessageCard({
  content,
  createdAt,
  author,
}: typeof messages.$inferSelect) {
  const params = useParams();
  const { locale } = params;

  return (
    <Card className="flex w-full flex-col gap-4 p-4">
      <p>{content}</p>

      <div className="text-muted-foreground flex flex-row items-center justify-between gap-4 text-sm">
        <p className="flex flex-row items-center gap-2">
          <User />
          {author}
        </p>
        <p className="flex flex-row items-center gap-2">
          <Clock size={16} />
          {createdAt!.toLocaleString(locale as Locale)}
        </p>
      </div>
    </Card>
  );
}
