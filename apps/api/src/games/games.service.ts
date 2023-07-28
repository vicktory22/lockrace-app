import { getDatabase } from "../database";
import { KVGame, Team } from "../types";
import dayjs from "dayjs";
import { AppContext } from "../types";
import { Game } from "./games.types";
import { GamesError } from "./games.errors";

export async function fetchGames(
	context?: AppContext
): Promise<Game[] | Error> {
  const today = dayjs();

	const db = getDatabase(context?.env?.DB);

  if (db instanceof Error) {
    return db;
  }

	const [teamsResult, gamesResult] = await Promise.all([
		db
			.get("teams")
			.then<Team[]>((res) => JSON.parse(res))
			.catch<Error>((e) => e),
		db
			.get(today.format("YYYY-MM-DD"))
			.then<KVGame[]>((res) => JSON.parse(res))
			.catch<Error>((e) => e),
	]);

	if (teamsResult instanceof Error) {
    return GamesError.fromTeams(teamsResult);
	}

	if (gamesResult instanceof Error) {
    return GamesError.fromGames(gamesResult);
	}

	return mergeResults(teamsResult, gamesResult);
}

function mergeResults(teams: Team[], games: KVGame[]): Game[] {
	const teamMap: Record<number, Team> = {};

	for (const team of teams) {
		teamMap[team.id] = team;
	}

	const combinedGames: Game[] = [];

	for (const game of games) {
		combinedGames.push({
			away_team: teamMap[game.away_team_id].display_name,
			away_odds: game.away_odds || 0,
			home_team: teamMap[game.home_team_id].display_name,
			home_odds: game.home_odds || 0,
			dt: dayjs(game.game_time),
		});
	}

	return combinedGames;
}
