import { Hono } from "hono";
import { handleErrors, handleNotFound } from "./errors";
import { fetchGames } from "./games/games.service";
import { AppEnv } from "./types";
import { corsMiddleware } from "./middleware/cors.middleware";

const app = new Hono<AppEnv>();

app.use("/games", corsMiddleware);

app.onError(handleErrors);
app.notFound(handleNotFound);

app.get("/games", async (c) => {
	const gamesResult = await fetchGames(c).catch<Error>((e) => e);

	if (gamesResult instanceof Error) {
		throw gamesResult;
	}

	return c.json(gamesResult);
});

export default app;
