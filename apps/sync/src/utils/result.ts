export type Result<T, E = Error> =
	| { ok: true; value: T }
	| { ok: false; error: E };

// rome-ignore lint/suspicious/noExplicitAny:
export function encase<T, A extends any[]>(fn: (...args: A) => T) {
	return function (...args: A): Result<T> {
		try {
			return { ok: true, value: fn(...args) };
		} catch (e) {
			if (e instanceof Error) {
				return { ok: false, error: e };
			}

			return { ok: false, error: new Error("Unknown Error", { cause: e }) };
		}
	};
}

export async function encaseAsync<T>(
	promise: Promise<T>,
): Promise<Result<Awaited<T>>> {
	try {
		const result = await promise;
		return { ok: true, value: result };
	} catch (e) {
    console.log({ e });
		if (e instanceof Error) {
			return { ok: false, error: e };
		}

		return { ok: false, error: new Error("Unknown Error", { cause: e }) };
	}
}
