import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable("messages", {
  id: integer().primaryKey({ autoIncrement: true }),
  author: text().default("Gall anonim"),
  content: text(),
  createdAt: integer({ mode: "timestamp" }).default(new Date()),
});
