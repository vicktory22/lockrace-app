import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { fetchGames } from "./games/fetch-games";
import { reply } from "./utils/responses";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
}

export default {
  async fetch(_request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const fetchResult = await fetchGames(env);

    if (!fetchResult.ok) {
      return reply.internalServerError(fetchResult.error.message);
    }

    return reply.ok(JSON.stringify({ games: fetchResult.value }));
  },
};
