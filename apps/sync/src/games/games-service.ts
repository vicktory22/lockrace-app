import { Env } from "../index";
import { Result } from "../utils/result";
import { pullFromApi } from "./api-pull";
import { parseApiPayload } from "./parse-api-payload";
import { KVGame } from "./parse-api-types";

export async function getGamesFromApi(env: Env): Promise<Result<KVGame[], Error>> {
  const pullResult = await pullFromApi(env);

  if (!pullResult.ok) {
    return pullResult;
  }

  return parseApiPayload(pullResult.value);
}
