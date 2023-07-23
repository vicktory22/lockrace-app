import { getLogger } from "logger";
import { getGames } from "./games/games.service";
import { KVNamespace, ExecutionContext } from "@cloudflare/workers-types";
import { fromPromise } from "neverthrow";
import { getAppConfig } from "./config";

export interface Env {
	LOGGER_URL: string;
	LOGGER_USER: string;
	LOGGER_API_KEY: string;
	GAMES_URL: string;
	DB: KVNamespace;
}

export default {
	async scheduled(_event: unknown, env: Env, ctx: ExecutionContext) {
		const config = getAppConfig(env);
		const logger = getLogger({
			appName: config.app.name,
			externalUrl: config.logger.url,
			externalUser: config.logger.user,
			externalApiKey: config.logger.apiKey,
		});

    console.log({ config, logger });

		const getGamesResult = await getGames(config.games.url);

		if (getGamesResult.isErr()) {
			ctx.waitUntil(logger.error(getGamesResult.error));
			return;
		}

		ctx.waitUntil(logger.info("Games fetched successfully"));

		const { day, games } = getGamesResult.value;

		await fromPromise(
			env.DB.put(day, JSON.stringify(games)),
			(err) => new Error("KV store error", { cause: err }),
		).match(
			() => ctx.waitUntil(logger.info("Games saved to KV store successfully")),
			(err) => ctx.waitUntil(logger.error(err)),
		);
	},
};
