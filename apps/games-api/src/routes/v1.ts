import { IRequest, Router, json } from "itty-router";
import { Env } from "../";

export const router = Router({ base: "/api/v1" });

router.get("/games/:game_id", async ({ params }: IRequest, { DB }: Env) => {
	const games = await DB.get(params.game_id, { type: "json" });

	return json(games);
});
