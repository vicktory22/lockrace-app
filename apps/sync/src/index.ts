import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { encaseAsync } from "./utils/result";
import { getGamesFromApi } from "./games/games-service";
import { KVGame } from "./games/parse-api-types";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
}

export default {
  async scheduled(_request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const gamesResult = await getGamesFromApi(env);

    if (!gamesResult.ok) {
      return;
    }

    const pastGames = await encaseAsync<KVGame[] | null>(env.FOOTBALL_METADATA.get("schedule", { type: "json" }));
    if (!pastGames.ok) {
      console.error("Unable to get past games", { cause: pastGames.error });
      return;
    }
    const saveResult = await encaseAsync(env.FOOTBALL_METADATA.put("schedule", JSON.stringify(gamesResult.value)));

    if (!saveResult.ok) {
      console.error(saveResult.error);
      return;
    }
  },
};
