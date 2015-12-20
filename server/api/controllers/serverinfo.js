'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();

module.exports = {
  getServerInfo: getServerInfo
};

function getServerInfo(req, res) {
  lxdClient.getServerInfo()
  .then(function(serverinfo) {
    res.json({
      serverinfo: serverinfo.metadata
    });
  });
}
