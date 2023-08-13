import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { encaseAsync } from "./utils/result";
import { getGames } from "./games/games-service";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
}

export default {
  async scheduled(_request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const gamesResult = await getGames(env);

    if (!gamesResult.ok) {
      return;
    }

    const saveResult = await encaseAsync(env.FOOTBALL_METADATA.put("schedule", JSON.stringify(gamesResult.value)));

    if (!saveResult.ok) {
      console.error(saveResult.error);
      return;
    }
  },
};
