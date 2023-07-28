import { Context } from "hono";

export type Bindings = {
	DB: KVNamespace;
};

export type AppEnv = { Bindings: Bindings };

export type AppContext = Context<{ Bindings: Bindings }>;

export type Team = {
	id: number;
	name: string;
	abbreviation: string;
	display_name: string;
	logo_url: string;
};

export type KVGame = {
	id: number;
	home_team_id: number;
	away_team_id: number;
	game_time: string;
	home_score: string;
	away_score: string;
	home_odds?: number;
	away_odds?: number;
};
