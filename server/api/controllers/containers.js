'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.lxd;
var ContainerModel = require('../models/Container');

module.exports = {
  getAllContainers,
  getAllContainersWithDetails,
  getContainer,
  updateContainer,
  renameContainer,
  createContainer
};

var config = process.env;

function getContainers() {
  return lxdClient.getContainers()
  .then((containers) => {
    return containers.metadata.map((resource) => {
      return new ContainerModel({
        resource: resource
      }).get();
    });
  })
}

function getAllContainers(req, res) {
  return getContainers()
  .then((containers) => {
    res.json({
      containers: containers
    });
  });
}

function getAllContainersWithDetails(req, res) {
  return getContainers()
  .then((containers) => {
    var promises = containers.map((container) => {
      return lxdClient.getContainer(container.getName())
        .then((containerData) => {
          if (!containerData.error) {
            container.set(containerData.metadata);
          }
          return container;
        });
    });
    return Promise.all(promises);
  })
  .then((containers) => {
    res.json({
      containers: containers
    });
  });
}

function getContainer(req, res) {
  var containerName = req.swagger.params.name.value;
  lxdClient.getContainer(containerName)
  .then((container) => {
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

  return lxdClient.updateContainer(name, {
    config: newConfig
  }).then((container) => {
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
  }).then((res) => {
    return lxdClient.waitOperation(res);
  })
  .then((container) => {
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
  container.save().then(() => {
    res.json({
      message: 'Success'
    });
  });
}
