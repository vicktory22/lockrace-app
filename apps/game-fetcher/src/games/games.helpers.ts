import { ResultAsync, errAsync, fromPromise, okAsync } from "neverthrow";
import { Event } from "../schemas/event.schema";
import { FetchGamesResponse } from "../schemas/fetch-games.schema";
import { Game, GetGamesResponse } from "./types";
import { GetGamesError } from "./games.errors";

export const handleBadRequest = (
	response: Response,
): ResultAsync<Response, GetGamesError> => {
	if (!response.ok) {
		return errAsync(
			GetGamesError.badRequest(response.status, response.statusText),
		);
	}

	return okAsync(response);
};

export const parseGamesResponseJson = (response: Response) =>
	fromPromise<unknown, GetGamesError>(response.json(), (err) =>
		GetGamesError.from(err),
	);

export const validateGamesResponse = (gamesResponse: unknown) =>
	fromPromise(FetchGamesResponse.parseAsync(gamesResponse), (err) =>
		GetGamesError.from(err),
	);

export const parseGamesResponse = (
	response: FetchGamesResponse,
): GetGamesResponse => {
	return {
		day: response.day.date,
		games: parseGames(response.events),
	};
};

const parseGames = (games: Event[]): Game[] => games.map(parseGame);

const parseGame = (game: Event): Game => {
	const competition = game.competitions[0];
	const consensusOdds = competition.odds?.find(
		(odd) => odd.provider.name === "consensus",
	);

	const { awayTeamOdds, homeTeamOdds } = consensusOdds || {};
	const [
		{ team: homeTeam, score: homeTeamScore },
		{ team: awayTeam, score: awayTeamScore },
	] = competition.competitors;

	return {
		id: +game.id,
		home_team_id: +homeTeam.id,
		home_team_name: homeTeam.name,
		away_team_id: +awayTeam.id,
		away_team_name: awayTeam.name,
		game_time: game.date,
		home_odds: homeTeamOdds?.moneyLine,
		away_odds: awayTeamOdds?.moneyLine,
		home_score: homeTeamScore ? +homeTeamScore : undefined,
		away_score: awayTeamScore ? +awayTeamScore : undefined,
	};
};
