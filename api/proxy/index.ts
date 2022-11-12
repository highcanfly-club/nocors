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

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const method: Method = req.method != "CONNECT" ? req.method : "GET";
  const corsHeaders = getCorsHeaders(req.headers.origin,method);
  const url = req.query.url || (req.body && req.body.url);
  const requestHeaders: Headers = cleanRequestHeaders(req.headers);
  context.log(`HTTP trigger function processed a request METHOD:${method} URL:${url}.`);


  if (req.method == "OPTIONS")
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
    const options: OptionsOfTextResponseBody = {
      method: method,
      decompress: false,
      headers: requestHeaders,
      body: req.body,
      http2: true,
    };
    console.log(req.headers);
    console.log(requestHeaders);
    const res = await got(url, options);
  
    context.res = {
      body: res.body,
      headers: {
        ...corsHeaders,
      },
    };
  }

};

export default httpTrigger;
