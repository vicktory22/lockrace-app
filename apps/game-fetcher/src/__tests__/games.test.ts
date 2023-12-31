import { getGames } from "../games/games.service";
import { server } from "../mocks/server";
import {
	afterAll,
	afterEach,
	assert,
	beforeAll,
	describe,
	expect,
	it,
} from "vitest";

describe("getGames", () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => server.close());

	it("should not return error on success", async () => {
		const getGamesResult = await getGames("http://localhost/games/200");

		assert(getGamesResult.isOk());

		expect(getGamesResult.value).toMatchObject(
			expect.objectContaining({
				day: expect.any(String),
				games: expect.any(Array),
			}),
		);
	});

	it("should return an error if there is a network error", async () => {
		const getGamesResult = await getGames("http://localhost/network-error");

		assert(getGamesResult.isErr());

		const error = getGamesResult.error;
		expect(error).toBeInstanceOf(Error);
		expect(error).toMatchInlineSnapshot("[GetGamesError: Failed to fetch]");
	});

	it("should return an error if we received an 4xx or 5xx response", async () => {
		const getGamesResult = await getGames("http://localhost/500");

		assert(getGamesResult.isErr());

		const error = getGamesResult.error;
		expect(error).toBeInstanceOf(Error);
		expect(error).toMatchInlineSnapshot(
			"[GetGamesError: 500 - Internal Server Error]",
		);
	});

	it("should return an error if we receive invalid json", async () => {
		const getGamesResult = await getGames("http://localhost/invalid-json");

		assert(getGamesResult.isErr());

		const error = getGamesResult.error;
		expect(error).toBeInstanceOf(Error);
		// TODO - fix this
		expect(error).toMatchInlineSnapshot("[GetGamesError: fetch failed]");
	});

	it("should return an error if we error during parsing of the returned json", async () => {
		const getGamesResult = await getGames("http://localhost/games/bad-json");

		assert(getGamesResult.isErr());

		const error = getGamesResult.error;
		expect(error).toBeInstanceOf(Error);
		expect(error).toMatchInlineSnapshot(
			"[GetGamesError: Unexpected token < in JSON at position 0]",
		);
	});

	it("should handle when there are no odds in the payload", async () => {
		const getGamesResult = await getGames("http://localhost/games/no-odds");

		assert(getGamesResult.isOk());

		const response = getGamesResult.value;
		const { away_odds, home_odds } = response.games[0];

		expect(away_odds).toBeUndefined();
		expect(home_odds).toBeUndefined();
	});

	it("should handle when there are scores in the paylaod", async () => {
		const getGamesResult = await getGames("http://localhost/games/no-scores");

		assert(getGamesResult.isOk());

		const response = getGamesResult.value;

		const { away_score, home_score } = response.games[0];

		expect(away_score).toBeUndefined();
		expect(home_score).toBeUndefined();
	});
});
