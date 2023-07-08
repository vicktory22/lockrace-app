import { Result } from "@sniptt/monads";
import { tryCatchPromise } from "../helpers/try-catch";
import { FetchGamesResponse } from "../schemas/fetch-games.schema";
import { GetGamesResponse } from "../types";
import { fetchWithTimeout } from "../utils/fetcher";
import { GetGamesError } from "./games.errors";
import { handleBadRequest, parseGamesResponse } from "./games.helpers";

export const getGames = async (
	gamesUrl: string,
): Promise<Result<GetGamesResponse, GetGamesError>> => {
	const fetchResult = await tryCatchPromise(
		fetchWithTimeout(gamesUrl)
			.then(handleBadRequest)
			.then((response) => response.json())
			.then(FetchGamesResponse.parseAsync),
		(err) => GetGamesError.from(err),
	);

	return fetchResult.map(parseGamesResponse);
};
