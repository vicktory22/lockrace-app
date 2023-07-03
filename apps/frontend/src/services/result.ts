import { Err, Ok, Result } from "@sniptt/monads";
export { type Result, Ok, Err } from "@sniptt/monads";

export function fromThrowable<T, E = unknown>(fn: () => T): Result<T, E> {
  try {
    return Ok(fn());
  } catch (error) {
    return Err(error as E);
  }
}

export async function fromPromise<T, E = unknown>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    return Ok(await promise);
  } catch (error) {
    return Err(error as E);
  }
}
