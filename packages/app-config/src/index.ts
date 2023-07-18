type StaticConfig = Record<string, string>;

type CloudflareEnv = Record<string, unknown>;

export type AppConfig = Record<string, string>;

export function getConfig(
	staticConfigs: StaticConfig,
	cloudflareEnv: CloudflareEnv,
): AppConfig {
	const config = { ...staticConfigs };

	const cloudflareEnvMap: Record<string, string> = {};

	for (const [key, value] of Object.entries(cloudflareEnv)) {
		if (typeof value !== "string") {
			continue;
		}

		cloudflareEnvMap[key] = value;
	}

	for (const key in staticConfigs) {
		const tempValue = cloudflareEnvMap[key] ?? process.env[key];

		if (tempValue === undefined) {
			continue;
		}

		config[key] = tempValue;
	}

	return config;
}
