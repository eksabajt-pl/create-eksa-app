"use server";
import { revalidateTag } from "next/cache";
import { addMessage } from "../db/message";

export const addMessageAction = async (formData: FormData) => {
  const content = formData.get("content") as string | null;
  const author = formData.get("author") as string | null;
  if (!content || !author) {
    return;
  }
  await addMessage(content, author);
  revalidateTag("messages");
};
