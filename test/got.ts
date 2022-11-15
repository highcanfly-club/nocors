/**
 * @file  nocors base
 * @author eltorio
 */

/* eslint-env node */

import path from "path";
import { expect } from "chai";
import { proxyAzureRequest } from "../src/Azure/index.js";
import { fileURLToPath } from "url";
import type { Form, HttpRequest } from "@azure/functions";

import exp from "constants";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("proxyAzureRequest to www.example.org shoud work", () => {
  it("request to https://www.example.org", async () => {
    let res: any = null;
    try
    {
      const req: HttpRequest = {
        method: "GET",
        url: "https://localhost/api/proxy?url=https://www.example.org",
        query: { url: "https://www.example.org" },
        headers: { host: "https://localhost" },
        params: {},
        user: null,
        parseFormBody: function (): Form {
          throw new Error("Function not implemented.");
        },
      };
      res = await proxyAzureRequest(".*", req);
    }
    catch(e){

    }
    expect(res.headers.Via).to.be.a("string");
    expect(res.body).to.be.not.null;
  });
});
