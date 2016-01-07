'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxc = helpers.lxc;

module.exports = {
  getServers
};

var config = process.env;

function getServers(req, reply) {

  lxc.getServers()
  .then((servers) => {
    reply.json({
      servers: servers
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}
