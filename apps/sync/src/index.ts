import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { encaseAsync } from "./utils/result";
import { getDatabase } from "./db/client";
import { getGamesFromApi } from "./games/get-games-from-api";
import { eventsToGames } from "./games/events-to-games";
import { upsertGames } from "./games/upsert-games";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
  DB_URL: string;
  DB_AUTH_TOKEN: string;
}

export default {
  async scheduled(_req: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const gamesResult = await getGamesFromApi(env);

    if (!gamesResult.ok) {
      console.error("Unable to get games from api", { cause: gamesResult.error });
      return;
    }

    const newGames = eventsToGames(gamesResult.value);

    const db = getDatabase(env.DB_URL, env.DB_AUTH_TOKEN);

    const upsertResult = await encaseAsync(upsertGames(db, newGames));

    if (!upsertResult.ok) {
      console.error("Unable to upsert games", { cause: upsertResult.error });
      return;
    }
  },
};
