import dayjs from "dayjs";
import { Team } from "../types";
import { FetchKVResult } from "./fetch-kv";

export type Pick = {
	away_team: string;
	away_odds: number;
	home_team: string;
	home_odds: number;
	dt: dayjs.Dayjs;
};

export function transformKV(kvResult: FetchKVResult): Pick[] {
	const [games, teams] = kvResult;

	const teamMap: Record<number, Team> = {};

	for (const team of teams) {
		teamMap[team.id] = team;
	}

	const picks: Pick[] = [];

	for (const game of games) {
		picks.push({
			away_team: teamMap[game.away_team_id].display_name,
			away_odds: game.away_odds || 0,
			home_team: teamMap[game.home_team_id].display_name,
			home_odds: game.home_odds || 0,
			dt: dayjs(game.game_time),
		});
	}

	return picks;
}
