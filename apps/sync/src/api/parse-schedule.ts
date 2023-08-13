import { Err, Ok } from "../utils/result";
import { ScheduledPayload } from "./schedule-types";

export function parseSchedulePayload(schedulePayload: ScheduledPayload) {
  const events = schedulePayload?.events;

  if (!events) {
    return Err("Unable to find events from api response");
  }

  const games = events?.map((event) => {
    const competition = event.competitions?.[0];

    const teams = competition?.competitors?.map((competitor) => ({
      id: competitor.id,
      homeAway: competitor.homeAway,
      abbreviation: competitor.team.abbreviation,
      displayName: competitor.team.displayName,
      color: competitor.team.color,
      logo: competitor.team.logo,
    }));

    const homeTeam = teams?.find((team) => team.homeAway === "home");
    const awayTeam = teams?.find((team) => team.homeAway === "away");

    return {
      id: event.id,
      date: event.date,
      shortName: event.shortName,
      week: event.week,
      odds: {
        spread: parseSpread(competition?.odds?.[0]?.details, { home: homeTeam?.abbreviation, away: awayTeam?.abbreviation }),
        overUnder: competition?.odds?.[0]?.overUnder,
      },
      teams: {
        home: homeTeam,
        away: awayTeam,
      },
    };
  });

  return Ok(JSON.stringify(games));
}

function parseSpread(spread: string | undefined, teams: { home: string | undefined, away: string | undefined }) {
  if (!spread) {
    return undefined;
  }

  if (spread === "EVEN") {
    return 0;
  }

  const [team, points] = spread.split(" ");

  if (team === teams.home) {
    return +points;
  }

  return (+points) * -1;
}

