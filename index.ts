/**
 * Check if the requested url is in the whitelist
 * @param url
 * @returns
 */
import type { HttpRequestHeaders, HttpResponseHeaders } from "@azure/functions";
import packageVersion from "./package.json" assert { type: "json" };

export declare type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "HEAD"
  | "DELETE"
  | "OPTIONS"
  | "TRACE"
  | "get"
  | "post"
  | "put"
  | "patch"
  | "head"
  | "delete"
  | "options"
  | "trace";

// WHITELIST is passed via env variable process.env.PROXY_WHITELIST

// you can use something like
// const WHITELIST_REGEX=/https:\/\/YOURSITE.com\/.*/
//
export const isAllowed = (
  url: string | null,
  whitelistRegex: string
): boolean => {
  const WHITELIST_REGEX = new RegExp(whitelistRegex);
  if (url === null) {
    return false;
  } else {
    return !(url.match(WHITELIST_REGEX) === null);
  }
};

//mini polyfill for ES6 compatibility (Object.fromEntries() needs ES2019)
export function fromEntries(
  iterable: Iterable<[string, string]>
): HttpRequestHeaders {
  return [...iterable].reduce((obj: HttpRequestHeaders, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

export class _Headers extends Map<string, string> {
  constructor(headers: Headers|Map<string,string>|HttpRequestHeaders) { //
    let _headers:Map<string,string>
    if (headers.hasOwnProperty('append')){
      // headers is of Headers|Map<string,string>
      _headers = new Map<string,string>((headers as Headers).entries())
    }
    else if (headers.hasOwnProperty('has')){
      // headers is of Headers|Map<string,string>
      _headers = headers as Map<string,string>
    }
    else{
      //headers is HttpRequestHeaders
      _headers = new Map<string,string>(Object.entries(headers))
    }
    super(_headers);
  }
  // append = (key: string, value: string) => {
  //   this.set(key, value);
  // };
}

/**
 * Remove conflicting headers
 * @param headers
 * @returns a copy of the source headers
 */
export const cleanRequestHeaders = (headers: _Headers): _Headers => {
  const requestHeaders: _Headers = new _Headers(headers); //real copy
  requestHeaders.has("X-Content-Type-Options")
    ? requestHeaders.delete("X-Content-Type-Options")
    : "";
  requestHeaders.has("host") ? requestHeaders.delete("host") : "";
  requestHeaders.has("connection") ? requestHeaders.delete("connection") : "";
  return requestHeaders;
};

/**
 * Remove conflicting headers
 * @param headers
 * @returns a copy of the source headers
 */
//  const cleanRequestHeaders = (headers: Headers): Headers => {
//   const requestHeaders: Headers = { ...headers }; //real copy
//   "X-Content-Type-Options" in requestHeaders
//     ? delete requestHeaders["X-Content-Type-Options"]
//     : "";

//   "host" in requestHeaders ? delete requestHeaders["host"] : "";
//   "connection" in requestHeaders ? delete requestHeaders["connection"] : "";
//   return requestHeaders;
// };

/**
 * Cosntruct a minimal set of CORS headers
 * @param origin CORS origin
 * @returns a set of required
 */
export const getCorsHeaders = (
  origin: string | null,
  method: Method
): HttpResponseHeaders => {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Content-Encoding, Accept",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT, DELETE",
    Via: `noCors-for-serverless v${packageVersion.version}`,
    "x-original-method": method,
  };
};

//  const getCorsHeaders = (origin: string | null, method: Method): Headers => {
//   const headersInit: HeadersInit = {
//     "Access-Control-Allow-Origin": origin || "*",
//     "Access-Control-Allow-Credentials": "true",
//     "Access-Control-Allow-Headers":
//       "Origin, X-Requested-With, Content-Type, Content-Encoding, Accept",
//     "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT, DELETE",
//     Via: `noCors-for-Cloudflare-Pages v${packageVersion.version}`,
//     "x-original-method": method,
//   };
//   return new Headers(headersInit);
// };
