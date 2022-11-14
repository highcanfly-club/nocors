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
} from "@azure/functions";
import { proxyAzureRequest } from "@sctg/nocors-azure";
import whitelistConf from "../common/config/whitelisteConf.json" assert { type: "json" };

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const proxiedRequest = await proxyAzureRequest(whitelistConf.regex, req);
  context.res = {
    status: proxiedRequest.status,
    body: proxiedRequest.body,
    headers: proxiedRequest.headers,
  };
};

export default httpTrigger;
