import { KVNamespace } from "@cloudflare/workers-types";
import { encaseAsync } from "./result";

export async function fetchKV(kv: KVNamespace, key: string) {
  return encaseAsync(kv.get(key));
}
