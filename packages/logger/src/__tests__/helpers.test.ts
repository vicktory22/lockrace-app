import { server } from "./mocks/server";
import {
	describe,
	it,
	expect,
	beforeAll,
	afterEach,
	afterAll,
} from "@jest/globals";
import { buildPayload, dispatch } from "../helpers";
import { BuildPayloadParams } from "../types";

describe("helpers", () => {
	describe("dispatch", () => {
		beforeAll(() => server.listen());

		afterEach(() => server.resetHandlers());

		afterAll(() => server.close());

		it("should dispatch the log", async () => {
			const config = {
				appName: "test",
				externalUrl: "http://localhost/200",
				externalUser: "test-user",
				externalApiKey: "test-api-key",
			};

			const result = await dispatch({
				message: "test",
				level: "info",
				config,
			});

			expect(result).toBeUndefined();
		});
	});

	describe("buildPayload", () => {
		it("should build the payload", () => {
			const buildPayloadInput: BuildPayloadParams = {
				message: "test",
				level: "info",
				nanoseconds: "123456789",
				appName: "test",
			};

			const payload = buildPayload(buildPayloadInput);

			expect(payload).toMatchInlineSnapshot(`
        {
          "streams": [
            {
              "stream": {
                "app": "test",
                "level": "info",
              },
              "values": [
                [
                  "123456789",
                  "test",
                ],
              ],
            },
          ],
        }
      `);
		});
	});
});
