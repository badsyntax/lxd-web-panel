'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxd = helpers.lxd;
var lxc = helpers.lxc;
var ImageModel = require('../models/Image');
var ImageAliasModel = require('../models/ImageAlias');

module.exports = {
  getAllImages,
  getAllImagesWithDetails,
  getAllImageAliases,
  getRemoteImages,
  createImageAlias,
  createImage,
  importImage,
  deleteImage
};

function getAllImageAliases(req, reply) {
  return lxd.getImageAliases()
  .then((res) => {
    var aliases = res.metadata.map((resource) => {
      return new ImageAliasModel({
        resource: resource
      }).get();
    });
    return aliases;
  })
  .then((aliases) => {
    reply.json({
      aliases: aliases
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

var config = process.env;

function getImages() {
  return lxd.getImages()
  .then((images) => {
    var images = images.metadata.map((resource) => {
      return new ImageModel({
        resource: resource
      });
    });
    return images;
  });
}

function getAllImages(req, reply) {
  return getImages()
  .then((images) => {
    reply.json({
      images: images
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function getAllImagesWithDetails(req, reply) {
  return getImages()
  .then((images) => {


    var promises = images.map((image) => {
      return lxd.getImage(image.fingerprint)
        .then((imageData) => {
          if (!imageData.error) {
            image.set(imageData.metadata);
          }
          return image.get();
        });
    });
    return Promise.all(promises);
  })
  .then((images) => {
    reply.json({
      images: images
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}

function createImage(req, reply) {
  var imageData = req.body;

  return lxd.createImage(imageData).then((res) => {
    if (res.error) { throw res; }
    return lxd.waitOperation(res)
    .then((operation) => {
      var metadata = JSON.parse(operation).metadata;
      if (metadata.status_code !== 200) {
        throw new Error({
          error_code: metadata.status_code
        });
      }
      reply.json({
        message: 'Success'
      });
    });
  })
  .catch((e) => {
    reply.status(e.error_code);
    reply.json({
      message: e.error || 'Unknown error'
    });
  });
}

function importImage(req, reply) {

  var imageData = req.body;

  var createImageData = {
    'public': imageData.public,
    source: {
      type: 'image',
      mode: 'pull',
      server: imageData.serverUrl,
      alias: imageData.remoteAlias
    }
  };

  return lxd.createImage(createImageData).then((res) => {
    if (res.error) { throw res; }
    return lxd.waitOperation(res)
    .then((operation) => {
      var metadata = JSON.parse(operation).metadata;
      if (metadata.status_code !== 200) {
        throw new Error({
          error_code: metadata.status_code
        });
      }
      return metadata;
    });
  })
  .then((metadata) => {
    var imageAliasData = {
      target: metadata.metadata.fingerprint,
      name: imageData.localAlias,
      description: imageData.description
    };
    return lxd.createImageAlias(imageAliasData);
  })
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
    reply.status(e.error_code);
    reply.json({
      message: e.error || 'Unknown error'
    });
  });
}

function createImageAlias(req, reply) {
  var json = req.body;

  return lxd.createImageAlias(json)
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

function deleteImage(req, reply) {
  var fingerprint = req.swagger.params.fingerprint.value;

  var json = req.body;

  return lxd.deleteImage(fingerprint)
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

function getRemoteImages(req, reply) {
  var imageName = req.swagger.params.name.value;

  lxc.getRemoteImages(imageName)
  .then((images) => {
    reply.json({
      images: images
    });
  })
  .catch((e) => {
    reply.status(500);
    reply.json({
      message: e.toString()
    });
  });
}
