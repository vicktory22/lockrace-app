import { KVNamespace } from "@cloudflare/workers-types";
import { mapDatabase } from "./database.map.service";
import { kvDatabase } from "./database.kv.service";
import { isKVNamespace } from "./utils";
import { DatabaseError } from "./database.errors";

export type KVDatabase = {
	get: (key: string) => Promise<string>;
	put: (key: string, value: string) => Promise<void>;
};

export type KVMap = Map<string, string>;

export function getDatabase(
	kvStore: KVNamespace | KVMap | undefined,
): KVDatabase | DatabaseError {
	if (!kvStore) {
		return DatabaseError.noDatabase();
	}

	if (isKVNamespace(kvStore)) {
		return kvDatabase(kvStore);
	}

	return mapDatabase(kvStore);
}
