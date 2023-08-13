export type KVGame = {
  id: string;
  date: string;
  shortName: string;
  week: Week;
  odds: Odds;
  teams: Teams;
};

type Odds = {
  spread?: number;
  overUnder?: number;
};

type Teams = {
  home?: Team;
  away?: Team;
};

type Team = {
  id: string;
  homeAway: HomeAway;
  abbreviation: string;
  displayName: string;
  color: string;
  logo: string;
};

type HomeAway = "away" | "home";

type Week = {
  number: number;
};
