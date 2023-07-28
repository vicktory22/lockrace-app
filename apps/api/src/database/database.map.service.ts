import { KVMap } from "./index";

export function mapDatabase(kvStore: KVMap) {
	const store = kvStore || new Map();

	return {
		get: (key: string) => {
			const value = store.get(key);

			if (value === undefined) {
				throw new Error(`Key ${key} not found in KV store.`);
			}

			return Promise.resolve(value);
		},

		put: (key: string, value: string) => {
			store.set(key, value);
			return Promise.resolve();
		},
	};
}
