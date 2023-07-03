import { z } from "zod";

export const TeamSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "abbreviation": z.string(),
    "display_name": z.string(),
    "logo_url": z.string(),
});

export type Team = z.infer<typeof TeamSchema>;
