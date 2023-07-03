import { fromPromise } from "../result";
import { z } from "zod";

const GAMES_URL = "http://site.api.espn.com/apis/site/v2/sporjkts/baseball/mlb/scoreboard";

const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  logo: z.string(),
});

const CompetitorSchema = z.object({
  id: z.string(),
  homeAway: z.string(),
  team: TeamSchema,
});

const OddSchema = z.object({
  provider: z.object({
    name: z.string(),
  }),
  awayTeamOdds: z.object({
    moneyLine: z.number(),
  }),
  homeTeamOdds: z.object({
    moneyLine: z.number(),
  }),
});

const CompetitionSchema = z.object({
  id: z.string(),
  competitors: z.array(CompetitorSchema),
  odds: z.array(OddSchema),
});

const EventSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  shortName: z.string(),
  competitions: z.array(CompetitionSchema),
});

const GamesSchema = z.object({
  day: z.object({
    date: z.string(),
  }),
  events: z.array(EventSchema),
});

export type Games = z.infer<typeof GamesSchema>;

type GameEvent = z.infer<typeof EventSchema>;

export function parseGames(events: GameEvent[]) {
  const parsedGames = [];

  for (const event of events) {
    parsedGames.push(parseGame(event));
  }

  return parsedGames;
}

function parseGame(event: GameEvent) {
  const competition = event.competitions[0];
  const consensusOdds = competition.odds?.find((odd) => odd.provider.name === "consensus");
  const { awayTeamOdds, homeTeamOdds } = consensusOdds || {};
  const [{ team: homeTeam }, { team: awayTeam }] = competition.competitors;

  return {
    id: +event.id,
    home_team_id: +homeTeam.id,
    away_team_id: +awayTeam.id,
    game_time: event.date,
    home_odds: homeTeamOdds?.moneyLine,
    away_odds: awayTeamOdds?.moneyLine,
    home_score: 0,
    away_score: 0,
  };
}

export async function fetchGames() {
  return fromPromise<Games, Error>(fetch(GAMES_URL).then((res) => res.json()));
}
