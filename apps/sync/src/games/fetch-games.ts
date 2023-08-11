import { Env } from "..";
import { Ok, Result, encaseAsync } from "../utils/result";
import { fetchWeekNumber } from "../weeks/fetch-week-number";

export async function fetchGames(env: Env): Promise<Result<unknown, Error>> {
  const weekNumber = await fetchWeekNumber(env.FOOTBALL_METADATA);

  if (!weekNumber.ok) {
    console.error("Error fetching week number", weekNumber.error);
    return Ok([]);
  }

  const url = env.GAMES_URL.replace(":week_id", weekNumber.value.toString());

  return encaseAsync(
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json()),
  );
}
