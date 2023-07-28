import { describe, expect, it } from "@jest/globals";
import { fetchGames } from "../games.service";

describe("fetchGames", () => {
	it("should return empty array if there is no context passed in", async () => {
		const result = await fetchGames(undefined);
		expect(result).toEqual([]);
	});

	it("should return empty array if there is no env", async () => {
		// @ts-ignore
		const result = await fetchGames({ env: undefined });
		expect(result).toEqual([]);
	});

	it("should return empty array if there is no env.DB", async () => {
		// @ts-ignore
		const result = await fetchGames({ env: { DB: undefined } });
		expect(result).toEqual([]);
	});
});
