import { dispatch } from "./helpers";

export type LoggerConfig = {
	appName: string;
	externalUrl: string;
	externalUser: string;
	externalApiKey: string;
};

export type Logger = {
	info: (message: string) => Promise<void>;
	error: (message: Error) => Promise<void>;
};

export function getLogger(config: LoggerConfig): Logger {
	return {
		info: (message: string) => dispatch({ message, level: "info", config }),
		error: (message: Error) => dispatch({ message, level: "error", config }),
	};
}
