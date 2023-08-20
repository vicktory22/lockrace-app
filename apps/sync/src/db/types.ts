import { InferModel } from "drizzle-orm";
import { games } from "../schema";

export type NewGame = InferModel<typeof games, "insert">;
