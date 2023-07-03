import { Err, Ok, type Result, fromThrowable } from "../result";
import { parse } from "cookie";

export type RequestCookies = Record<string, string>;

export function getTokenFromRequest(request: Request): Result<string, string> {
  return parseCookiesFromRequest(request).andThen(extractTokenCookie);
}

function parseCookiesFromRequest(request: Request): Result<RequestCookies, string> {
  const cookies = request.headers.get("Cookie");

  if (!cookies) {
    return Err("No cookie found in request");
  }

  return fromThrowable<RequestCookies, string>(() => parse(cookies)).mapErr(() => "Unable to parse cookies");
}

const extractTokenCookie = (cookies: RequestCookies): Result<string, string> =>
  cookies["__session"] ? Ok(cookies["__session"]) : Err("Invalid token [not found]");
