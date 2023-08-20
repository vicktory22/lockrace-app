import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export function getDatabase(url: string, authToken: string) {
  let client = createClient({ url });

  if (process.env.NODE_ENV === "production") {
    client = createClient({ url, authToken });
  }

  return drizzle(client);
}
