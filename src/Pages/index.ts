/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vuejs v3
- Font Awesome
- And many others
*/

import { isAllowed, getCorsHeaders, cleanRequestHeaders, Method, _Headers, fromEntries } from "../index.js";

/**
 * Proxy the request
 * @param url the url to proxy
 * @param method GET, POST…
 * @param requestHeaders
 * @param body
 * @returns
 */
const remoteRequest = async (
  url: string,
  method: Method,
  requestHeaders: _Headers,
  body: any
) => {
  const options: RequestInit = {
    method: method,
    headers: {...fromEntries(requestHeaders)},
    body: body,
    redirect: "follow",
  };
  const res = await fetch(url, options);
  return res;
};

export declare type ProxyPagesFunction<
Env = unknown,
Params extends string = any,
Data extends Record<string, unknown> = Record<string, unknown>
> = (context: EventContext<Env, Params, Data>,whitelistRegex:string) => Response | Promise<Response>;

export const proxyPagesRequest: ProxyPagesFunction = async (context:any,whitelistRegex:string) => {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const method: Method =
    request.method != "CONNECT" ? (request.method as Method) : "GET";
  const corsHeaders = new Headers(
    getCorsHeaders(request.headers.get("origin"), method)
  );

  const sUrl = new URL(request.url);
  const url = sUrl.searchParams.get("url");
  const requestHeaders: _Headers = cleanRequestHeaders(request.headers);

  if (!isAllowed(url,whitelistRegex) || url === null) {
    corsHeaders.append("Allow", "OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE");
    return new Response("Access to this proxy is forbidden for you ☹️", {
      status: 403,
      headers: corsHeaders,
    });
  } else if (method == "OPTIONS") {
    corsHeaders.append("Allow", "OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE");
    return new Response("", {
      status: 200,
      headers: corsHeaders,
    });
  } // not options so general case
  else {
    const res = await remoteRequest(url, method, requestHeaders, request.body);
    const buffer: ArrayBuffer = await res.arrayBuffer();
    corsHeaders.append("Allow", "OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE");
    return new Response(buffer, {
      status: res.status,
      headers: new Headers([...corsHeaders, ...res.headers]),
    });
  }
};
