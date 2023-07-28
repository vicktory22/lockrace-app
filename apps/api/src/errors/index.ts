import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { getLogger } from "../logger";
import { DatabaseError } from "../database/database.errors";
import { GamesError } from "../games/games.errors";

const logger = getLogger();

export function handleErrors(err: unknown, c: Context) {
  if (err instanceof Error) {
    logger.error(err);
  }

  if (err instanceof DatabaseError || err instanceof GamesError) {
    return c.json({ message: 'Unable to fetch games', ok: false }, 500);
  }

	if (err instanceof HTTPException) {
    return c.json({ message: err.message, ok: false }, err.status);
	}

  return c.json({ message: 'Unknown error encountered', ok: false }, 500);
}

export function handleNotFound(c: Context) {
  return c.json({ message: 'Not Found', ok: false }, 404);
}
