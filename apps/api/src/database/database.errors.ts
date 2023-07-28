export class DatabaseError extends Error {
	constructor(message: string, cause?: Error) {
		super(message);
		this.name = "DatabaseError";
		this.cause = cause;
	}

	static noDatabase() {
		return new DatabaseError("No database found.");
	}
}
