'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();

module.exports = {
  get: get
};

function get(req, res) {
  lxdClient.getServerInfo()
  .then(function(serverinfo) {
    res.json({
      serverinfo: serverinfo.metadata
    });
  });
}
