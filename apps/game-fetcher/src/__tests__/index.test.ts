import { ExecutionContext, KVNamespace } from "@cloudflare/workers-types";
import worker, { Env } from "../index";
import { server } from "../mocks/server";
import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

const infoLoggerMock = vi.fn();
const errorLoggerMock = vi.fn();

vi.mock("logger", () => {
	return {
		getLogger: () => ({
			info: infoLoggerMock,
			error: errorLoggerMock,
		}),
	};
});

describe("Worker", () => {
	const ctx = {
		waitUntil: (_promise: Promise<unknown>): void => {},
	} as ExecutionContext;

	const buildEnv = (overrides?: Partial<Env>) =>
		({
			DB: {
				put: (_key: string, _value: string): Promise<void> => Promise.resolve(),
			} as KVNamespace,
			...overrides,
		}) as Env;

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	it("should return undefined for happy path", async () => {
		const env = buildEnv();

		await expect(
			worker.scheduled(undefined, env, ctx),
		).resolves.toBeUndefined();
	});

	it("should log an error if there is an error when saving to the KV store", async () => {
		const env = buildEnv({
			DB: {
				put: (_key: string, _value: string): Promise<void> =>
					Promise.reject(new Error("KV store error")),
			} as KVNamespace,
		});

		await expect(
			worker.scheduled(undefined, env, ctx),
		).resolves.toBeUndefined();

		expect(errorLoggerMock).toHaveBeenCalledTimes(1);
		expect(errorLoggerMock).toHaveBeenCalledWith(expect.any(Error));

		const error = errorLoggerMock.mock.lastCall[0];
		expect(error).toMatchInlineSnapshot("[Error: KV store error]");
	});
});
