import { afterEach, describe, expect, it } from '@jest/globals';
import { getConfig } from '../index';

describe('getConfig', () => {
  const env = { ...process.env };

  afterEach(() => {
    process.env = { ...env };
  });

  it('should return the passed in config if there are no cloudflareEnv', () => {
    const staticConfig = {
      "key1": "value1",
      "key2": "value2",
    };

    const cloudflareEnv = {};

    const config = getConfig(staticConfig, cloudflareEnv);

    expect(config).toEqual(staticConfig);
  });

  it('should overwrite the static config with the cloudflareEnv', () => {
    const staticConfig = {
      "key1": "value1",
      "key2": "value2",
    };

    const cloudflareEnv = {
      "key1": "value3",
      "key2": "value4",
    };

    const config = getConfig(staticConfig, cloudflareEnv);

    expect(config).toEqual(cloudflareEnv);
  });

  it('should overwrite the static config with environment variables', () => {
    const staticConfig = {
      "key1": "value1",
      "key2": "value2",
    };

    process.env["key1"] = "value3";
    process.env["key2"] = "value4";

    const cloudflareEnv = {};

    const config = getConfig(staticConfig, cloudflareEnv);

    expect(config).toEqual({
      "key1": "value3",
      "key2": "value4",
    });
  });

  it('should not overwrite if cloudflareEnv is not a string', () => {
    const staticConfig = {
      "key1": "value1",
      "key2": "value2",
    };

    const cloudflareEnv = {
      "key1": 1,
      "key2": 2,
    };

    const config = getConfig(staticConfig, cloudflareEnv);

    expect(config).toEqual(staticConfig);
  });
});

