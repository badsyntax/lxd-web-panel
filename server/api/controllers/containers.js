'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ContainerModel = require('../models/Container');

module.exports = {
  getAllContainers: getAllContainers,
  getContainer: getContainer,
  updateContainer: updateContainer,
  renameContainer: renameContainer,
  createContainer: createContainer
};

var config = process.env;

function getAllContainers(req, res) {
  lxdClient.getContainers()
  .then(function(containers) {
    return containers.metadata.map(function(name) {
      return new ContainerModel({
        name: name
      });
    });
  })
  .then(function(containers) {
    var promises = containers.map(function(container) {
      return lxdClient.getContainer(container.name)
        .then(function(containerData) {
          container.setData(containerData.metadata);
          return container;
        });
    });
    return Promise.all(promises);
  })
  .then(function(containers) {
    res.json({
      containers: containers
    });
  });
}

function getContainer(req, res) {
  var containerName = req.swagger.params.name.value;
  lxdClient.getContainer(containerName)
  .then(function(container) {
    if (container.error) {
      res.status(500);
      return res.json({
        message: container.error
      });
    }
    res.json({
      container: new ContainerModel(container.metadata)
    });
  });
}

function updateContainer(req, res) {

  var name = req.swagger.params.name.value;

  var newConfig = req.body;

  console.log('UPDATE CONTAINER CONFIG', newConfig)

  return lxdClient.updateContainer(name, {
    config: newConfig
  }).then(function(container) {
    if (container.error) {
      res.status(container.error_code);
      return res.json({
        error: container.error
      });
    }
    res.json({
      message: 'Success'
    });
  });
}

function renameContainer(req, res) {

  var name = req.swagger.params.name.value;
  var newName = req.body.name;

  lxdClient.renameContainer(name, {
    name: newName
  }).then(function(res) {
    return lxdClient.waitOperation(res);
  })
  .then(function(container) {
    if (container.error) {
      res.status(container.error_code);
      return res.json({
        error: container.error
      });
    }
    res.json({
      message: 'Success'
    });
  });
}

function createContainer(req, res) {
  var containerName = req.body.name;
  var container = new ContainerModel({
    name: containerName
  });
  container.save().then(function() {
    res.json({
      message: 'Success'
    });
  });
}
