import dayjs from 'dayjs';

export type Game = {
	away_team: string;
	away_odds: number;
	home_team: string;
	home_odds: number;
	dt: dayjs.Dayjs;
};
