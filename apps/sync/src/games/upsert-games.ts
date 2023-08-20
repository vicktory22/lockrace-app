import { LibSQLDatabase } from "drizzle-orm/libsql";
import { NewGame } from "../db/types";
import { games } from "../schema";
import { sql } from "drizzle-orm";

export async function upsertGames(db: LibSQLDatabase, newGames: NewGame[]) {
  return db
    .insert(games)
    .values(newGames)
    .onConflictDoUpdate({
      target: games.game_id,
      set: {
        spread: sql`CASE WHEN excluded.spread > games.spread THEN excluded.spread ELSE games.spread END`,
        home_team_score: sql`CASE WHEN excluded.home_team_score > games.home_team_score THEN excluded.home_team_score ELSE games.home_team_score END`,
        away_team_score: sql`CASE WHEN excluded.away_team_score > games.away_team_score THEN excluded.away_team_score ELSE games.away_team_score END`,
        updated_at: sql`(strftime('%s', 'now'))`,
      },
    })
    .returning()
    .get();
}
