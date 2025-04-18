import { drizzle } from "drizzle-orm/libsql/sqlite3";

export const db = drizzle({
  connection: {
    url: "file:./db.sqlite",
  },
});
