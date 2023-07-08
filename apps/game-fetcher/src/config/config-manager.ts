/* v8 ignore start */
import { Env } from "../index";
import { isTestEnv } from "../utils/testing-setup";

export type AppConfig = {
	gamesUrl: string;
	logToUrl: string;
	authToken: string;
};

export const getConfig = (env?: Env): AppConfig => {
	if (isTestEnv()) {
		return testConfig(env);
	}

	if (!env) {
		return getFromMeta();
	}

	return getFromEnv(env);
};

const testConfig = (env?: Env): AppConfig => ({
	gamesUrl: env?.GAMES_URL || "http://localhost/games/200",
	logToUrl: env?.LOKI_URL || "http://localhost/200",
	authToken: "test-loki-auth-token",
});

const getFromMeta = (): AppConfig => {
	const { VITE_GAMES_URL, VITE_LOKI_URL, VITE_LOKI_USER, VITE_LOKI_API_KEY } =
		import.meta.env;

	return {
		gamesUrl: VITE_GAMES_URL,
		logToUrl: VITE_LOKI_URL,
		authToken: createToken(VITE_LOKI_USER, VITE_LOKI_API_KEY),
	};
};

const getFromEnv = (env: Env): AppConfig => {
	const { GAMES_URL, LOKI_URL, LOKI_USER, LOKI_API_KEY } = env;

	return {
		gamesUrl: GAMES_URL,
		logToUrl: LOKI_URL,
		authToken: createToken(LOKI_USER, LOKI_API_KEY),
	};
};

const createToken = (user: string, apiKey: string): string =>
	btoa(`${user}:${apiKey}`);
/* v8 ignore end */
