import { errAsync, fromPromise, okAsync } from "neverthrow";
import {
	BuildPayloadParams,
	BuildPayloadResult,
	DispatchInput,
	DispatchResult,
	PostLogParams,
	PostLogResult,
} from "./types";

export function dispatch({
	message,
	level,
	config,
}: DispatchInput): DispatchResult {
	const nanoseconds = (Date.now() * 1e6).toString();
	const { externalUrl, externalUser, externalApiKey, appName } = config;

	return postLog({
		url: externalUrl,
		authToken: createToken(externalUser, externalApiKey),
		message: buildPayload({ message, level, nanoseconds, appName }),
	})
		.andThen((res) => {
			if (!res.ok) {
				return errAsync(
					new Error(
						`Invalid response received from Loki logging service: [${res.status} - ${res.statusText}]`,
					),
				);
			}

			return okAsync(res);
		})
		.match(
			() => {},
			(err) => {
				throw err;
			},
		);
}

function postLog({ message, authToken, url }: PostLogParams): PostLogResult {
	return fromPromise(
		fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Basic ${authToken}`,
			},
			body: JSON.stringify(message),
		}),
		(cause) => new Error("Error sending log to logging service.", { cause }),
	);
}

export function buildPayload({
	message,
	level,
	nanoseconds,
	appName,
}: BuildPayloadParams): BuildPayloadResult {
	return {
		streams: [
			{
				stream: {
					level,
					app: appName,
				},
				values: [[nanoseconds, message]],
			},
		],
	};
}

function createToken(user: string, apiKey: string): string {
	return btoa(`${user}:${apiKey}`);
}
