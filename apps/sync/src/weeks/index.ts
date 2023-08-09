import { KVNamespace } from "@cloudflare/workers-types";
import { KVWeek } from "../types";

export async function fetchWeeksFromKV(kv: KVNamespace): Promise<KVWeek[]> {
	const weeks: string | Error = await kv.get("weeks").catch((err) => err);

	if (weeks instanceof Error) {
    console.error("Error fetching weeks from KV", weeks);
		return [];
	}

  try {
    return JSON.parse(weeks);
  } catch (err) {
    console.error("Error parsing weeks from KV", err);
    return [];
  }
}
