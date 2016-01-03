'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxd = helpers.lxd;
var lxc = helpers.lxc;
var ImageModel = require('../models/Image');
var ImageAliasModel = require('../models/ImageAlias');

module.exports = {
  getAllImages: getAllImages,
  getAllImagesWithDetails: getAllImagesWithDetails,
  getAllImageAliases: getAllImageAliases,
  getRemoteImages: getRemoteImages,
  createImageAlias: createImageAlias,
  createImage: createImage
};

function getAllImageAliases(req, reply) {
  return lxd.getImageAliases()
  .then(function(res) {
    var aliases = res.metadata.map(function(resource) {
      return new ImageAliasModel({
        resource: resource
      });
    });
    return aliases;
  })
  .then(function(aliases) {
    reply.json({
      aliases: aliases
    });
  })
  .catch(function(e) {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

var config = process.env;

function getImages() {
  return lxd.getImages()
  .then(function(images) {
    var images = images.metadata.map(function(resource) {
      return new ImageModel({
        resource: resource
      });
    });
    return images;
  });
}

function getAllImages(req, reply) {
  return getImages()
  .then(function(images) {
    reply.json({
      images: images
    });
  })
  .catch(function(e) {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function getAllImagesWithDetails(req, reply) {
  return getImages()
  .then(function(images) {

    var promises = images.map(function(image) {
      return lxd.getImage(image.getFingerprint())
        .then(function(imageData) {
          if (!imageData.error) {
            image.setData(imageData.metadata);
          }
          return image;
        });
    });
    return Promise.all(promises);
  })
  .then(function(images) {
    reply.json({
      images: images
    });
  })
  .catch(function(e) {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function createImage(req, reply) {
  var imageData = req.body;

  console.log('create image with data', imageData);

  return lxd.createImage(imageData).then(function(res) {
    if (res.error) { throw res; }
    return lxd.waitOperation(res)
    .then(function(operation) {
      var metadata = JSON.parse(operation).metadata;
      if (metadata.status_code !== 200) {
        throw {
          error_code: metadata.status_code
        };
      }
      return metadata;
    });
  })
  .then(function(metadata) {
    reply.json({
      message: 'Success'
    });
  })
  .catch(function(e) {
    reply.status(e.error_code);
    reply.json({
      message: e.error || 'Unknown error'
    });
  });
}

function createImageAlias(req, reply) {
  var json = req.body;

  return lxd.createImageAlias(json)
  .then(function(res) {
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
  .catch(function(e) {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function getRemoteImages(req, reply) {
  var imageName = req.swagger.params.name.value;

  lxc.getRemoteImages(imageName)
  .then(function(images) {
    reply.json({
      images: images
    });
  })
  .catch(function(e) {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}
