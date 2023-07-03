import { Err, Result, fromPromise, fromThrowable } from "../result";
import * as jose from "jose";

export async function validateToken(token: string | undefined, pemKey: string): Promise<Result<string, string>> {
  if (typeof token !== "string") {
    return Err("Invalid token provided: [type]");
  }

  const decodedPemKeyResult = fromThrowable(() => atob(pemKey));

  if (decodedPemKeyResult.isErr()) {
    return Err("Unknown error");
  }

  const validationResult = await fromPromise(
    jose.importSPKI(decodedPemKeyResult.unwrap(), "RS256").then((pubKey) => jose.jwtVerify(token, pubKey)),
  );

  return validationResult.map(({ payload }) => payload.sub || "").mapErr(() => "userId not found");
}
