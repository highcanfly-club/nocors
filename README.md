# Simplest noCors proxy for Serverless(Azure/Cloudflare) Web App

This is a very minimalistic proxy for enabling CORS on non CORS enabled sites.  

## For Azure Static Web Apps  
Create a new api entry with VSCode Azure tools or manually.  
```sh
cd api
npm i --save @sctg/nocors
npm i --save got
npm i --save @azure/functions
```
In the index.ts of the new api route
```ts
import {
  AzureFunction,
  Context,
  HttpRequest,
} from "@azure/functions";
import { proxyAzureRequest } from "@sctg/nocors";
const WHITELIST_REGEX=".*"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const proxiedRequest = await proxyAzureRequest(WHITELIST_REGEX, req);
  context.res = {
    status: proxiedRequest.status,
    body: proxiedRequest.body,
    headers: proxiedRequest.headers,
  };
};

export default httpTrigger;
```

## For Coudflare Pages
```sh
npm i --save @sctg/nocors
npm i -D --save @cloudflare/workers-types
```
create a /functions/proxy.ts file
```ts
import {proxyRequest} from "@sctg/nocors"
const WHITELIST_REGEX=".*"
export const onRequest: PagesFunction = async (context) => {
  return proxyRequest(context,WHITELIST_REGEX)
};
```
