import { afterEach, assert, beforeAll, describe, expect, it } from "vitest";
import { getGames } from "../games.service";
import { server } from "../../mocks/server";

describe("Games Service", () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	describe("On network error", () => {
		it("returns an error result", async () => {
			const result = await getGames("http://localhost/500");

			assert(result.isErr());

			expect(result.error).toMatchInlineSnapshot(
				"[GetGamesError: 500 - Internal Server Error]",
			);
		});
	});

	describe("On network success", () => {
		describe("On valid response", () => {
			it("returns correctly payload", async () => {
				const result = await getGames("http://localhost/games/200");

				assert(result.isOk());

				expect(result.value).toMatchObject(
					expect.objectContaining({
						day: expect.any(String),
						games: expect.any(Array),
					}),
				);
			});
		});

		describe("On invalid response", () => {
			it("returns an error result if the ", async () => {
				const result = await getGames("http://localhost/games/bad-json");

				assert(result.isErr());

				expect(result.error).toMatchInlineSnapshot(
					"[GetGamesError: Unexpected token < in JSON at position 0]",
				);
			});
		});
	});
});
