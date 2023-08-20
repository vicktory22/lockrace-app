import { sql } from "drizzle-orm";
import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  game_id: integer("game_id").primaryKey(),
  week_id: integer("week_id").notNull(),
  home_team_id: integer("home_team_id").notNull(),
  home_team_score: integer("home_team_score"),
  away_team_id: integer("away_team_id").notNull(),
  away_team_score: integer("away_team_score"),
  game_time: integer("game_time", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`).notNull(),
  spread: integer("spread"),
  created_at: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updated_at: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
