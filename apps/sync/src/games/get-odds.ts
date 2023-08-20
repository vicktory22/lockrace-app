export function getOdds(details: string | undefined, homeTeamAbbreviation: string | undefined): number | undefined {
  if (!details) {
    return undefined;
  }

  const [team, spread] = details.split(" ");

  if (spread === undefined) {
    return 0;
  }

  if (team === homeTeamAbbreviation) {
    return parseFloat(spread);
  }

  return -1.0 * parseFloat(spread);
}
