import { Hono } from "hono";
import { cors } from "hono/cors";
import { handleErrors, handleNotFound } from "./errors";
import { fetchGames } from "./games/games.service";
import { AppEnv } from "./types";

const app = new Hono<AppEnv>();

app.use("/*", cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

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
