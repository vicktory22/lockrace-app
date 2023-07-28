export function kvDatabase(kvStore: KVNamespace) {
	return {
		get: async (key: string) => {
			const value = await kvStore.get(key);

			if (value === null) {
				throw new Error(`Key ${key} not found in KV store.`);
			}

			return value;
		},

		put: async (key: string, value: string) => {
			await kvStore.put(key, value);
		},
	};
}
