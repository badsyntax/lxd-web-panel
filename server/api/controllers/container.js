'use strict';

var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ContainerModel = require('../models/Container');

module.exports = {
  get: get
};

var config = process.env;

function get(req, res) {
  lxdClient.getContainer(req.swagger.params.name.value).then(function(container, err) {
    if (container.error) {
      res.status(500);
      return res.json({
        error: container.error
      });
    }
    res.json({
      container: new ContainerModel(container.metadata)
    });
  });
}
