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
  HttpResponseHeaders,
} from "@azure/functions";
import got, { Headers, Method, OptionsOfTextResponseBody } from "got";
import packageVersion from "../package.json" assert { type: "json" };
import whitelistConf from "../common/config/whitelisteConf.json" assert { type: "json" };

// WHITELIST is passed via env variable process.env.PROXY_WHITELIST
const WHITELIST_REGEX = new RegExp(whitelistConf.regex)

// you can use something like
// const WHITELIST_REGEX=/https:\/\/YOURSITE.com\/.*/
//

/**
 * Cosntruct a minimal set of CORS headers
 * @param origin CORS origin
 * @returns a set of required
 */
const getCorsHeaders = (origin: string, method:Method): HttpResponseHeaders => {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Content-Encoding, Accept",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT, DELETE",
    Via: `noCors-for-Azure-StaticWebApp v${packageVersion.version}`,
    "x-original-method": method
  };
};

/**
 * Remove conflicting headers
 * @param headers
 * @returns a copy of the source headers
 */
const cleanRequestHeaders = (headers: Headers): Headers => {
  const requestHeaders: Headers = { ...headers }; //real copy
  "X-Content-Type-Options" in requestHeaders
    ? delete requestHeaders["X-Content-Type-Options"]
    : "";

  "host" in requestHeaders ? delete requestHeaders["host"] : "";
  "connection" in requestHeaders ? delete requestHeaders["connection"] : "";
  return requestHeaders;
};

/**
 * Proxy the request
 * @param url the url to proxy
 * @param method GET, POST…
 * @param requestHeaders 
 * @param body 
 * @returns 
 */
const remoteRequest = async (url:string, method:Method, requestHeaders:Headers, body:any)=>{
  const options: OptionsOfTextResponseBody = {
    method: method,
    decompress: false,
    headers: requestHeaders,
    body: body,
    http2: true,
    throwHttpErrors: false
  };
  const res = await got(url, options);
  return res
}

/**
 * Check if the requested url is in the whitelist
 * @param url 
 * @returns 
 */
const isAllowed = (url:string):boolean => {
  return !(url.match(WHITELIST_REGEX) === null)
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const method: Method = req.method != "CONNECT" ? req.method : "GET";
  const corsHeaders = getCorsHeaders(req.headers.origin,method);
  const url = req.query.url || (req.body && req.body.url);
  const requestHeaders: Headers = cleanRequestHeaders(req.headers);
  context.log(`HTTP trigger function processed a request METHOD:${method} URL:${url}.`);

  if (!isAllowed(url))
  {
    context.res = {
      status: 403,
      body: 'Access to this proxy is forbidden for you ☹️',
      headers: {
        Allow: 'OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE',
        ...corsHeaders,
      },
    };
  }
  else if (req.method == "OPTIONS")
  {
    context.res = {
      headers: {
        Allow: 'OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE',
        ...corsHeaders,
      },
    };
  }
  else // not options so general case
  {
    const res = await remoteRequest(url,method,requestHeaders,req.body)
    context.res = {
      status: res.statusCode,
      body: res.body,
      headers: {
        ...corsHeaders,
      },
    };
  }

};

export default httpTrigger;
