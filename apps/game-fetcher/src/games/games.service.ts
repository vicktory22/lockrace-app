import { ResultAsync, fromPromise, okAsync } from "neverthrow";
import { GetGamesResponse } from "./types";
import { fetchWithTimeout } from "../utils/fetcher";
import { GetGamesError } from "./games.errors";
import {
	handleBadRequest,
	parseGamesResponse,
	parseGamesResponseJson,
	validateGamesResponse,
} from "./games.helpers";

export const getGames = (
	gamesUrl: string,
): ResultAsync<GetGamesResponse, GetGamesError> =>
	fromPromise(fetchWithTimeout(gamesUrl), (err) => GetGamesError.from(err))
		.andThen(handleBadRequest)
		.andThen(parseGamesResponseJson)
		.andThen(validateGamesResponse)
		.andThen((r) => okAsync(parseGamesResponse(r)));
