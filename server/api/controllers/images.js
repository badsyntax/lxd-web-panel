'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ImageModel = require('../models/Image');
var ImageAliasModel = require('../models/ImageAlias');

module.exports = {
  getAllImages: getAllImages,
  getAllImagesWithDetails: getAllImagesWithDetails,
  getAllImageAliases: getAllImageAliases,
  createImageAlias: createImageAlias,
  importImage: importImage
};

function getAllImageAliases() {
  return lxdClient.getImageAliases()
  .then(function(res) {
    var aliases = res.metadata.map(function(resource) {
      return new ImageAliasModel({
        resource: resource
      });
    });
    return aliases;
    console.log('IMaGE ALIASES', aliases);
  });
}

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

function importImage(req, res) {
  // var alias = req.body.alias;
  // var remoteImage = req.body.remoteImage;

  // var createImageData = {
  //   public: true,
  //   "source": {
  //       "type": "url",
  //       "url": "https://www.some-server.com/image"
  //   }
  // }

  // lxdClient.createImage()


  // var container = new Image({
  //   name: containerName
  // });
  // container.save().then(function() {
  //   res.json({
  //     message: 'Success'
  //   });
  // });
}

function createImageAlias() {

}
