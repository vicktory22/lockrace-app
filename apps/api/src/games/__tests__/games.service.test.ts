import {
	jest,
	describe,
	expect,
	it,
	afterEach,
	beforeEach,
} from "@jest/globals";
import assert from "node:assert";
import { fetchGames } from "../games.service";
import { DatabaseError } from "../../database/database.errors";

describe("fetchGames", () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	beforeEach(() => {
		jest.useFakeTimers();
	});

	describe("before games are released", () => {
		beforeEach(() => {
			jest.setSystemTime(new Date("2021-01-01T08:00:00.000Z"));
		});

		it("should return an empty array if it is before 4pm UTC / 9am PST", async () => {
			const result = await fetchGames(undefined);

			expect(result).toEqual([]);
		});
	});

	describe("after games are released", () => {
		beforeEach(() => {
			jest.setSystemTime(new Date("2021-01-01T18:00:00.000Z"));
		});

		it("should return empty array if there is no context passed in", async () => {
			const result = await fetchGames(undefined);

			assert(result instanceof DatabaseError);
			expect(result.message).toBe("No database found.");
		});

		it("should return empty array if there is no env", async () => {
			// @ts-ignore
			const result = await fetchGames({ env: undefined });

			assert(result instanceof DatabaseError);
			expect(result.message).toBe("No database found.");
		});

		it("should return empty array if there is no env.DB", async () => {
			// @ts-ignore
			const result = await fetchGames({ env: { DB: undefined } });

			assert(result instanceof DatabaseError);
			expect(result.message).toBe("No database found.");
		});
	});
});
