import { getConfig } from "../config-manager";
import { describe, expect, it } from "vitest";

describe("ConfigManager", () => {
	it("should default to use .env file if no env parameter is passed in", () => {
		const config = getConfig();

		expect(config).toMatchInlineSnapshot(`
      {
        "authToken": "test-loki-auth-token",
        "gamesUrl": "http://localhost/games/200",
        "logToUrl": "http://localhost/200",
      }
    `);
	});
});
