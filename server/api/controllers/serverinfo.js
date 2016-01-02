'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.lxd;

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
