import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { reply } from "./utils/responses";
import { pull } from "./api/pull";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
}

export default {
  async fetch(request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (request.method !== "GET" || url.pathname !== "/") {
      console.log("Unknown request received", request);
      return reply.notFound();
    }

    const pullResult = await pull(env);

    if (!pullResult.ok) {
      return reply.internalServerError(pullResult.error.message);
    }

    // @ts-ignore
    console.log("Pull result received", pullResult.value.week);

    return reply.ok("OK");
    // return reply.ok(JSON.stringify({ games: pullResult.value }));
  },
};
