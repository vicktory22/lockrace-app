export class GamesError extends Error {
    constructor(cause?: Error) {
      const message = "Unable to fetch games";

      super(message);
      this.name = "GamesError";
      this.cause = cause;
    }

    static fromTeams(cause: Error) {
      return new GamesError(cause);
    }

    static fromGames(cause: Error) {
      return new GamesError(cause);
    }
}
