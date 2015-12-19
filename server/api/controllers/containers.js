'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ContainerModel = require('../models/Container');

module.exports = {
  get: get
};

var config = process.env;

function get(req, res) {
  lxdClient.getContainers()
  .then(function(containers) {
    res.json({
      containers: containers.metadata.map(function(name) {
        return new ContainerModel({
          name: name
        });
      })
    });
  });
}
