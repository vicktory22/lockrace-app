export type ApiPayload = {
  events: Event[];
};

export type Event = {
  id: string;
  date: string;
  shortName: string;
  week: Week;
  competitions: Competition[];
};

export type Competition = {
  competitors: Competitor[];
  odds?: Odd[];
};

export type Competitor = {
  id: string;
  homeAway: HomeAway;
  team: Team;
};

export type HomeAway = "home" | "away";

export type Team = {
  abbreviation: string;
  displayName: string;
  color: string;
  logo: string;
};

export type Week = {
  number: number;
};

export type Odd = {
  details: string;
  overUnder: number;
};
