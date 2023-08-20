CREATE TABLE `games` (
	`game_id` integer PRIMARY KEY NOT NULL,
	`week_id` integer NOT NULL,
	`home_team_id` integer NOT NULL,
	`home_team_score` integer,
	`away_team_id` integer NOT NULL,
	`away_team_score` integer,
	`game_time` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`spread` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
