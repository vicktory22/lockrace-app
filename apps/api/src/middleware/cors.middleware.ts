import { Next } from "hono";
import { AppContext } from "../types";

export async function corsMiddleware(c: AppContext, next: Next): Promise<void> {
	const origin = c.req.headers.get("origin");

	const shouldAddCors =
		origin && (await shouldAddCorsHeader(origin, c?.env?.DB));

	await next();

	if (!shouldAddCors) {
		return;
	}

	c.header("Access-Control-Allow-Origin", origin);
	c.header("Access-Control-Allow-Credentials", "true");
}

async function shouldAddCorsHeader(
	origin: string | null,
	db: KVNamespace | undefined,
): Promise<boolean> {
	if (!origin || !db) {
		return false;
	}

	const allowedOrigins = await db.get("allowed-origins");

	if (!allowedOrigins) {
		return false;
	}

	return allowedOrigins.split(",").includes(origin);
}
