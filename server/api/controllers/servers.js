'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxc = helpers.lxc;

module.exports = {
  getServers,
  addServer
};

var config = process.env;

function getServers(req, reply) {
  lxc.getServers()
  .then((servers) => {
    reply.json({
      servers: servers
    });
  })
  .catch((e) => handleError(e, reply));
}

function addServer(req, reply) {
  return lxc.addServer(req.body)
  .then((res) => {
    reply.json({
      message: 'Success'
    });
  })
  .catch((e) => handleError(e, reply));
}

function handleError(e, reply) {
  reply.status(500);
  reply.json({
    message: e.toString()
  });
}
