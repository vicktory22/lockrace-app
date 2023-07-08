type BuildPayloadInput = {
  message: string | Error;
  level: string;
  nanoseconds: string;
  appName: string;
}

export type LoggerConfig = {
  logToUrl: string;
  authToken: string;
  appName: string;
}

export type Logger = {
  info: (message: string) => Promise<void>;
  error: (message: Error) => Promise<void>;
};

const buildPayload = ({ message, level, nanoseconds, appName }: BuildPayloadInput) => ({
  streams: [
    {
      stream: {
        level,
        app: appName,
      },
      values: [[nanoseconds, message]],
    },
  ],
});

export const dispatch = async (
  message: string | Error,
  level: string,
  config: LoggerConfig,
): Promise<void> => {
  const nanoseconds = (Date.now() * 1e6).toString();

  const fetchResult = await fetch(config.logToUrl, {
    headers: {
      method: "POST",
      "content-type": "application/json",
      authorization: `Basic ${config.authToken}`,
    },
    body: JSON.stringify(buildPayload({ message, level, nanoseconds, appName: config.appName })),
  })
  .catch((error: unknown) => new Error('Network error', { cause: error }));

  if (fetchResult instanceof Error) {
    throw fetchResult;
  }

  if (!fetchResult.ok) {
    throw new Error(`Invalid response received from Loki logging service: [${fetchResult.status} - ${fetchResult.statusText}]`);
  }
};
