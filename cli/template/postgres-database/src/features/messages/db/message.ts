"use server";
import { db } from "@/db/db";
import { messages } from "@/db/schema/message";
import { desc } from "drizzle-orm";

export const addMessage = async (content: string, author: string) => {
  await db.insert(messages).values({ content, author });
};

export const getMessages = async () => {
  return await db.select().from(messages).orderBy(desc(messages.id));
};
