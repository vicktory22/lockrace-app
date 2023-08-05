import {
	ExecutionContext,
	KVNamespace,
	Request as WorkerRequest,
} from "@cloudflare/workers-types";

export interface Env {
	GAMES_URL: string;
	FOOTBALL_METADATA: KVNamespace;
	FOOTBALL_GAMES: KVNamespace;
}

export default {
	async fetch(_request: WorkerRequest, _env: Env, _ctx: ExecutionContext) {
		return new Response("Hello World!");
	},
};
