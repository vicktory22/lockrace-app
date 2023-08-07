import {
	ExecutionContext,
	KVNamespace,
	Request as WorkerRequest,
} from "@cloudflare/workers-types";
import { fetchWeeksFromKV } from "./weeks";

export interface Env {
	GAMES_URL: string;
	FOOTBALL_METADATA: KVNamespace;
	FOOTBALL_GAMES: KVNamespace;
}

export default {
	async fetch(_request: WorkerRequest, env: Env, _ctx: ExecutionContext) {
		const weeks = await fetchWeeksFromKV(env.FOOTBALL_METADATA);

		return new Response(JSON.stringify(weeks));

};
