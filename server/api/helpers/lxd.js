'use strict';

var fs = require('fs');
var lxd = require('lxd');
var config = process.env;

module.exports = new lxd.LXD({
  uri: config.LXD_URI,
  client: {
    strictSSL: false,
    agentOptions: {
      cert: fs.readFileSync(config.LXD_CERT),
      key: fs.readFileSync(config.LXD_KEY)
    }
  }
});
