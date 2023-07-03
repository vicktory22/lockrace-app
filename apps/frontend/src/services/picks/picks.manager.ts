export const getPicksService = (kvStore: KVNamespace, isTestEnv: boolean = false) => {
  if (isTestEnv) {
    return testService();
  }

  return picksService(kvStore);
};

const testService = () => {};

const picksService = (kvStore: KVNamespace) => {};
