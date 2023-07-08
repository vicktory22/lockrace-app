import { Err, Ok, Result } from "@sniptt/monads";

export const tryCatchPromise = async <T, E>(
	promiseFn: Promise<T>,
	errorFn: (e: unknown) => E,
): Promise<Result<T, E>> => {
	try {
		return Ok(await promiseFn);
	} catch (err) {
		return Err(errorFn(err));
	}
};

export const tryCatchThrowable = <T>(f: () => T): Result<T, Error> => {
	try {
		return Ok(f());
	} catch (err) {
		if (err instanceof Error) {
			return Err(err);
		}

		return Err(new Error("Unknown error", { cause: err }));
	}
};
