import { Env } from "../index";

type AppConfig = typeof defaultConfig;

const defaultConfig = {
	app: {
		name: "game-fetcher",
	},
	logger: {
		url: "http://localhost/logger",
		user: "test-user",
		apiKey: "test-api-key",
	},
	games: {
		url: "http://localhost/games/200",
	},
};

export function getAppConfig(workerConfig: Env): AppConfig {
	return {
		app: {
			name: "game-fetcher",
		},
		logger: {
			url: workerConfig.LOGGER_URL ?? "http://localhost/logger",
			user: workerConfig.LOGGER_USER ?? "test-user",
			apiKey: workerConfig.LOGGER_API_KEY ?? "test-api-key",
		},
		games: {
			url: workerConfig.GAMES_URL ?? "http://localhost/games/200",
		},
	};
}
