import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema",
  dbCredentials: { url: "file:./db.sqlite" },
});
