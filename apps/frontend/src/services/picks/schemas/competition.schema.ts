import { z } from "zod";

export const CompetitionSchema = z.object({
    "id": z.number(),
    "home_team_id": z.number(),
    "away_team_id": z.number(),
    "game_time": z.string(),
    "home_score": z.string(),
    "away_score": z.string(),
    "home_odds": z.union([z.number(), z.null()]).optional(),
    "away_odds": z.union([z.number(), z.null()]).optional(),
});

export type Competition = z.infer<typeof CompetitionSchema>;
