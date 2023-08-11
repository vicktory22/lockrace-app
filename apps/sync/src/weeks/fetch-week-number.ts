import { KVNamespace } from "@cloudflare/workers-types";
import { fetchKV } from "../utils/kv";
import { Err, Ok, Result, encase } from "../utils/result";
import { KVWeek } from "../types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export async function fetchWeekNumber(kv: KVNamespace): Promise<Result<number, Error>> {
  const weeksResult = await fetchKV(kv, "weeks");

  if (!weeksResult.ok) {
    return Err("Error fetching weeks from KV", { cause: weeksResult.error });
  }

  const weekData = weeksResult.value;

  if (weekData === null) {
    return Err("No week number found");
  }

  const safeParseKVWeeks = encase(JSON.parse);

  const parsedWeeksResult: Result<KVWeek[], Error> = safeParseKVWeeks(weekData);

  if (!parsedWeeksResult.ok) {
    return Err("Error parsing weeks from KV", {
      cause: parsedWeeksResult.error,
    });
  }

  for (const week of parsedWeeksResult.value) {
    if (dayjs().isBetween(week.startDate, week.endDate, "day", "[]")) {
      return Ok(week.weekNumber);
    }
  }

  return Err("Unable to find current week number");
}
