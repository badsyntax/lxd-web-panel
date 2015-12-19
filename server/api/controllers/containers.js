'use strict';

var util = require('util');
var fs = require('fs');
var lxd = require('lxd');

module.exports = {
  list: list
};

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

function ContainerModel(name) {
  this.name = name;
}

ContainerModel.factory = function(name) {
  return new ContainerModel(name);
};

function list(req, res) {
  lxdClient.getContainers().then(function(containers) {
    res.json({
      containers: containers.metadata.map(ContainerModel.factory)
    });
  });
}
