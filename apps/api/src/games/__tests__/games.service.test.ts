import { describe, expect, it } from "@jest/globals";
import assert from "node:assert";
import { fetchGames } from "../games.service";
import { DatabaseError } from "../../database/database.errors";

describe("fetchGames", () => {
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
