'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.lxd;

module.exports = {
  getServerInfo
};

function getServerInfo(req, res) {
  lxdClient.getServerInfo()
  .then((serverinfo) => {
    res.json({
      serverinfo: serverinfo.metadata
    });
  });
}
