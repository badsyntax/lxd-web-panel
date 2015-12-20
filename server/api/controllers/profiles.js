'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ProfileModel = require('../models/Profile');

module.exports = {
  getAllProfiles: getAllProfiles
};

var config = process.env;

function getAllProfiles(req, res) {
  lxdClient.getProfiles()
  .then(function(profiles) {
    return profiles.metadata.map(function(name) {
      return new ProfileModel({
        name: name
      });
    });
  })
  .then(function(profiles) {
    res.json({
      profiles: profiles
    });
  });
}