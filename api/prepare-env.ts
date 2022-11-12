import fs from "fs";
const whitelisteConf = {
  regex: process.env.PROXY_WHITELIST
};
fs.writeFile(
  "./common/config/whitelisteConf.json",
  JSON.stringify(whitelisteConf),
  "utf8",
  function (err) {
    if (err) return console.log(err);
  }
);
