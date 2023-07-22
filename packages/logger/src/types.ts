import { ResultAsync } from "neverthrow";
import { LoggerConfig } from "./index";

export type DispatchInput = {
	message: string | Error;
	level: string;
	config: LoggerConfig;
};

export type DispatchResult = Promise<void>;

export type PostLogParams = {
	url: string;
	authToken: string;
	message: BuildPayloadResult;
};

export type PostLogResult = ResultAsync<Response, Error>;

export type BuildPayloadParams = {
	message: string | Error;
	level: string;
	nanoseconds: string;
	appName: string;
};

export type BuildPayloadResult = {
	streams: {
		stream: {
			level: string;
			app: string;
		};
		values: [[string, string | Error]];
	}[];
};
