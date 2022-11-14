/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vuejs v3
- Font Awesome
- And many others
*/
import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpRequestHeaders,
} from "@azure/functions";
import got, { Headers as GotHeaders, OptionsOfTextResponseBody } from "got";
import {
  isAllowed,
  getCorsHeaders,
  cleanRequestHeaders,
  Method,
  fromEntries,
  _Headers,
} from "../index.js";

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
  requestHeaders: GotHeaders,
  body: any
) => {
  const options: OptionsOfTextResponseBody = {
    method: method,
    decompress: false,
    headers: requestHeaders,
    body: body,
    http2: true,
    throwHttpErrors: false,
  };
  const res = await got(url, options);
  return res;
};

export type ProxyAzureFunction = (
  whitelistRegex: string,
  req: HttpRequest
) => Promise<{
  status: number;
  body: string;
  headers: HttpRequestHeaders;
}>;

export const proxyAzureRequest: ProxyAzureFunction = async function (
  whitelistRegex: string,
  req: HttpRequest
): Promise<{
  status: number;
  body: string;
  headers: HttpRequestHeaders;
}> {
  try {
    const method: Method =
      req.method != "CONNECT" ? req.method || "GET" : "GET";
    const corsHeaders = getCorsHeaders(req.headers.origin, method);
    const url = req.query.url || (req.body && req.body.url);
    const requestHeaders: GotHeaders = {
      ...fromEntries(cleanRequestHeaders(new _Headers(req.headers)).entries()),
    };
    console.log(
      `HTTP trigger function processed a request METHOD:${method} URL:${url}.`
    );

    if (!isAllowed(url, whitelistRegex)) {
      return {
        status: 403,
        body: "Access to this proxy is forbidden for you ☹️",
        headers: {
          Allow: "OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE",
          ...corsHeaders,
        },
      };
    } else if (req.method == "OPTIONS") {
      return {
        body: "",
        status: 200,
        headers: {
          Allow: "OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE",
          ...corsHeaders,
        },
      };
    } // not options so general case
    else {
      const res = await remoteRequest(url, method, requestHeaders, req.body);
      return {
        status: res.statusCode,
        body: res.body,
        headers: {
          ...corsHeaders,
        },
      };
    }
  } catch (error: any) {
    return { status: 500, body: "ERROR", headers: {} };
  }
};
