/**
 * @file  nocors base
 * @author eltorio
 */

/* eslint-env node */

import path from 'path';
import {expect} from "chai";
import {getCorsHeaders,cleanRequestHeaders,isAllowed} from '../dist/index.js';
import {fileURLToPath} from 'url';
import packageVersion from "../package.json" assert {type:"json"}

import exp from 'constants';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('NoCors', () => {

    it('getCorsHeaders(null,"GET") should return 6 headers', () => {
       const _corsHeaders = new Map(Object.entries(getCorsHeaders(null,'GET')))
        expect(_corsHeaders.size).to.be.equal(6);
    });

    it('getCorsHeaders(null,"GET") Via header must be filled', () => {
        const _corsHeaders = getCorsHeaders(null,'GET')

         expect(_corsHeaders.Via).to.be.equal(`noCors-for-serverless v${packageVersion.version}`)
     });

     it('isAllowed("https://www.google.fr", ".*") must be true', () => {
         expect(isAllowed("https://www.google.fr",".*")).to.be.equal(true)
     });

     it('isAllowed("https://www.google.fr", "https://www.example.org/.*") must be false', () => {
        expect(isAllowed("https://www.google.fr", "https://www.example.org/.*")).to.be.equal(false)
    });
    
    it('isAllowed("https://www.example.org/api?url=toto", "https://www.example.org/.*") must be true', () => {
        expect(isAllowed("https://www.example.org/api?url=toto", "https://www.example.org/.*")).to.be.equal(true)
    });
});

