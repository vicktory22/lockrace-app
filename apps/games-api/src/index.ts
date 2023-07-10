import { Router, error, json } from "itty-router";
import { router as routerV1 } from "./routes/v1";
import {
	ExecutionContext,
	KVNamespace,
	Request,
} from "@cloudflare/workers-types";

export interface Env {
	DB: KVNamespace;
}

const router = Router({ base: "/api" });
router.all("/v1/*", routerV1.handle).all("*", () => error(404));

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return router.handle(request, env, ctx).then(json).catch(error);
	},
};
