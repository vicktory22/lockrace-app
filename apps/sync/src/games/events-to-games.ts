import { NewGame } from "../db/types";
import { ApiPayload } from "./api-types";
import { getOdds } from "./get-odds";

export function eventsToGames(payload: ApiPayload): NewGame[] {
  const newGames: NewGame[] = [];

  for (const event of payload.events) {
    const gameId = event.id;
    const weekId = event.week.number;
    const gameTime = event.date;

    const homeTeam = event.competitions[0].competitors.find((c) => c.homeAway === "home");
    const awayTeam = event.competitions[0].competitors.find((c) => c.homeAway === "away");

    const spread = getOdds(event.competitions[0].odds?.[0].details, homeTeam?.team.abbreviation);

    if (!homeTeam?.id || !awayTeam?.id) {
      console.error("Unable to find team id", { homeTeam, awayTeam });
      continue;
    }

    newGames.push({
      game_id: +gameId,
      week_id: weekId,
      home_team_id: +homeTeam.id,
      home_team_score: homeTeam?.score ? +homeTeam.score : 0,
      away_team_id: +awayTeam.id,
      away_team_score: awayTeam?.score ? +awayTeam.score : 0,
      game_time: new Date(gameTime),
      spread: spread ? +spread : 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return newGames;
}
