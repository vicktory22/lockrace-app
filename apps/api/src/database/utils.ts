import { KVMap } from ".";

export function isKVNamespace(
	kvStore: KVNamespace | KVMap,
): kvStore is KVNamespace {
	return kvStore !== undefined;
}
