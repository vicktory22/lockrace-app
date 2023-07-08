import { LoggerConfig, Logger, dispatch } from "./helpers";

export const getLogger = (config: LoggerConfig): Logger => {
  return {
    info: (message: string) => dispatch(message, "info", config),
    error: (message: Error) => dispatch(message, "error", config),
  };
};
