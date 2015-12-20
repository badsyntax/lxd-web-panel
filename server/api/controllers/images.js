'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ImageModel = require('../models/Image');

module.exports = {
  getAllImages: getAllImages
};

var config = process.env;

function getAllImages(req, res) {
  lxdClient.getImages()
  .then(function(images) {
    return images.metadata.map(function(name) {
      return new ImageModel({
        name: name
      });
    });
  })
  .then(function(images) {
    res.json({
      images: images
    });
  });
}
