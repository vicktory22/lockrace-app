import { KVNamespace } from "@cloudflare/workers-types";
import { KVWeek } from "../types";

export async function fetchWeeksFromKV(kv: KVNamespace): Promise<KVWeek[]> {
	const weeks: string | Error = await kv.get("weeks").catch((err) => err);

	if (weeks instanceof Error) {
		return [];
	}

	return JSON.parse(weeks);
}
