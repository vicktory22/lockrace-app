import { describe, it, expect } from "@jest/globals";
import { LoggerConfig, getLogger } from "../index";

describe("getLogger", () => {
	it("should return a logger", () => {
		const config: LoggerConfig = {
			appName: "test",
			externalUrl: "test-url",
			externalUser: "test-user",
			externalApiKey: "test-api-key",
		};

		const logger = getLogger(config);
		expect(logger).toMatchObject({
			info: expect.any(Function),
			error: expect.any(Function),
		});
	});
});
