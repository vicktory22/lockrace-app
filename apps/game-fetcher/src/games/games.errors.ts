export class GetGamesError extends Error {
	constructor(message: string, public readonly cause: unknown) {
		super(message);
		this.name = "GetGamesError";
	}

	static badRequest(status: number, statusText: string) {
		return new GetGamesError(`${status} - ${statusText}`, undefined);
	}

	static from(err: unknown) {
		if (err instanceof GetGamesError) {
			return err;
		}

		if (err instanceof Error) {
			return new GetGamesError(err.message, err);
		}

		return new GetGamesError("Unknown error", err);
	}
}
