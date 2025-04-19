import { text, serial, timestamp, pgTable } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial().primaryKey(),
  author: text().default("Gall anonim"),
  content: text(),
  createdAt: timestamp().default(new Date()),
});
