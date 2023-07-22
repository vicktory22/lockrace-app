import { rest } from "msw";

export const handlers = [
	rest.post("http://localhost/200", (_req, res, ctx) => {
		return res(ctx.status(201));
	}),
];
