var fs = require('fs');
var lxd = require('lxd');

var config = process.env;

var lxdClient = new lxd.LXD({
  uri: config.LXD_URI,
  client: {
    strictSSL: false,
    agentOptions: {
      cert: fs.readFileSync(config.LXD_CERT),
      key: fs.readFileSync(config.LXD_KEY)
    }
  }
});

module.exports = {
	getLXDClient: function() {
		return lxdClient;
	}
};
