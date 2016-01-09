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
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function addServer(req, reply) {
  var json = req.body;

  return lxc.addServer(json)
  .then((res) => {
    if (res.error) {
      reply.status(res.error_code);
      return reply.json({
        message: res.error
      });
    }
    reply.json({
      message: 'Success'
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}
