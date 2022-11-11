import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpRequestHeaders,
} from "@azure/functions";
import got, { Method, OptionsOfTextResponseBody } from "got";
import packageVersion from "../package.json" assert { type: "json" };

//function fix(reqHeaders:HttpRequestHeaders, myHeaders,isOPTIONS:boolean) {
//   //            myHeaders.set("Access-Control-Allow-Origin", "*");
//   myHeaders.set("Access-Control-Allow-Origin", reqHeaders.get("Origin"));
//   if (isOPTIONS) {
//       myHeaders.set("Access-Control-Allow-Methods", reqHeaders.get("access-control-request-method"));
//       acrh = event.request.headers.get("access-control-request-headers");
//       //myHeaders.set("Access-Control-Allow-Credentials", "true");

//       if (acrh) {
//           myHeaders.set("Access-Control-Allow-Headers", acrh);
//       }

//       myHeaders.delete("X-Content-Type-Options");
//   }
//   return myHeaders;
// }

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const isOPTIONS = req.method == "OPTIONS";
  const corsHeaders = {
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Content-Encoding, Accept",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PATCH, PUT, DELETE",
    Via: `noCors v${packageVersion.version}`,
  };
  const reqHeaders = { ...req.headers, ...corsHeaders };
  const url = req.query.url || (req.body && req.body.url);
  let method: Method = req.method != "CONNECT" ? req.method : "GET";

  "X-Content-Type-Options" in reqHeaders
    ? delete reqHeaders["X-Content-Type-Options"]
    : "";
  "x-ms-original-url" in reqHeaders
    ? delete reqHeaders["x-ms-original-url"]
    : "";
  "host" in reqHeaders ? delete reqHeaders["host"] : "";

  const options: OptionsOfTextResponseBody = {
    method: method,
    decompress: false,
    headers: reqHeaders as any,
  };
  console.log(req.headers);
  console.log(reqHeaders);
  const res = await got(url, options);

  context.res = {
    body: res.body,
    headers: {
      ...reqHeaders,
    },
  };
};

export default httpTrigger;
