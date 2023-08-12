import { Env } from "..";
import { Err, Ok, Result, encaseAsync } from "../utils/result";
import { ScheduledPayload } from "./schedule-types";

export async function pull(env: Env): Promise<Result<ScheduledPayload, Error>> {
  const url = env.SCOREBOARD_URL;

  const apiResult = await encaseAsync(fetch(url).then((res) => res.json()));

  if (!apiResult.ok) {
    return Err("Unable to fetch from external api", { cause: apiResult.error });
  }

  return Ok(apiResult.value);
}
