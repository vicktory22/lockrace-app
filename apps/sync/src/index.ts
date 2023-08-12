import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { reply } from "./utils/responses";
import { pull } from "./api/pull";
import { parseSchedulePayload } from "./api/parse-schedule";

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

    const gamesResult = parseSchedulePayload(pullResult.value);

    if (!gamesResult.ok) {
      return reply.internalServerError(gamesResult.error.message);
    }

    await env.FOOTBALL_METADATA.put("schedule", gamesResult.value);

    return reply.ok("OK");
  },
};
