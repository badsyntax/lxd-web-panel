'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ImageModel = require('../models').ImageModel;

module.exports = {
  getAllImages: getAllImages,
  getAllImagesWithDetails: getAllImagesWithDetails
};

var config = process.env;

function getImages() {
  return lxdClient.getImages()
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
  });
}

function getAllImagesWithDetails(req, reply) {
  return getImages()
  .then(function(images) {

    var promises = images.map(function(image) {
      return lxdClient.getImage(image.getFingerprint())
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
  });
}
