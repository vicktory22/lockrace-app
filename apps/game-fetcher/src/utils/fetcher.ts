import { RequestInit } from "@cloudflare/workers-types";

type FetcherOptions = RequestInit & {
	timeout?: number;
};

const TIMEOUT_MS = 800;

export const fetchWithTimeout = async (
	url: string,
	options: FetcherOptions = {},
) => {
	const { timeout = TIMEOUT_MS } = options;

	const controller = new AbortController();

	const timeoutId = setTimeout(() => {
		/* c8 ignore next */
		controller.abort();
	}, timeout);

	// TODO: update `fetch` when available
	// @ts-ignore
	const response = await fetch(url, {
		...options,
		signal: controller.signal,
	});

	clearTimeout(timeoutId);

	return response;
};
