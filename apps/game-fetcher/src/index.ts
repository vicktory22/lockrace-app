import { getLogger } from "logger";
import { getConfig } from "./config/config-manager";
import { getGames } from "./games/games.service";
import { KVNamespace, ExecutionContext } from "@cloudflare/workers-types";
import { tryCatchPromise } from "./helpers/try-catch";

export interface Env {
	GAMES_URL: string;
	LOKI_URL: string;
	LOKI_USER: string;
	LOKI_API_KEY: string;
	DB: KVNamespace;
}

export default {
	async scheduled(_event: unknown, env: Env, ctx: ExecutionContext) {
		const config = getConfig(env);
		const logger = getLogger({
			logToUrl: config.logToUrl,
			authToken: config.authToken,
			appName: "game-fetcher",
		});

		const getGamesResult = await getGames(config.gamesUrl);

		if (getGamesResult.isErr()) {
			ctx.waitUntil(logger.error(getGamesResult.unwrapErr()));
			return;
		}

    ctx.waitUntil(logger.info("Games fetched successfully"));

		const { day, games } = getGamesResult.unwrap();

		const saveGamesResult = await tryCatchPromise(
			env.DB.put(day, JSON.stringify(games)),
			(err) => new Error("KV store error", { cause: err }),
		);

    ctx.waitUntil(logger.info("Games saved to KV store successfully"));

		saveGamesResult.match({
			ok: () => ctx.waitUntil(logger.info("Games were pulled successfully")),
			err: (err) => ctx.waitUntil(logger.error(err)),
		});
	},
};
