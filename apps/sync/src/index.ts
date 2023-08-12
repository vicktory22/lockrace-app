import { ExecutionContext, KVNamespace, Request as WorkerRequest } from "@cloudflare/workers-types";
import { pull } from "./api/pull";
import { parseSchedulePayload } from "./api/parse-schedule";
import { encaseAsync } from "./utils/result";

export interface Env {
  SCOREBOARD_URL: string;
  GAMES_URL: string;
  FOOTBALL_METADATA: KVNamespace;
  FOOTBALL_GAMES: KVNamespace;
}

export default {
  async scheduled(_request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
    const pullResult = await pull(env);

    if (!pullResult.ok) {
      console.error(pullResult.error);
      return;
    }

    const gamesResult = parseSchedulePayload(pullResult.value);

    if (!gamesResult.ok) {
      console.error(gamesResult.error);
      return;
    }

    const saveResult = await encaseAsync(env.FOOTBALL_METADATA.put("schedule", gamesResult.value));

    if (!saveResult.ok) {
      console.error(saveResult.error);
    }
  },
};
