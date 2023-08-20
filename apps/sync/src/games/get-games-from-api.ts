import { Env } from "../index";
import { Ok, Result } from "../utils/result";
import { pullFromApi } from "./api-pull";
import { ApiPayload } from "./api-types";

export async function getGamesFromApi(env: Env): Promise<Result<ApiPayload, Error>> {
  const pullResult = await pullFromApi(env);

  if (!pullResult.ok) {
    return pullResult;
  }

  return Ok(pullResult.value);
}
