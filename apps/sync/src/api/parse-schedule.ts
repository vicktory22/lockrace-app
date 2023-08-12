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

    return {
      id: event.id,
      date: event.date,
      shortName: event.shortName,
      week: event.week,
      odds: {
        spread: competition?.odds?.[0]?.details,
        overUnder: competition?.odds?.[0]?.overUnder,
      },
      teams,
    };
  });

  return Ok(JSON.stringify(games));
}
