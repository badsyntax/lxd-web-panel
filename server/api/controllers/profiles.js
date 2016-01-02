'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var ProfileModel = require('../models/Profile');

module.exports = {
  getAllProfiles: getAllProfiles,
  getAllProfilesWithDetails: getAllProfilesWithDetails
};

var config = process.env;

function getProfiles() {
  return lxdClient.getProfiles()
  .then(function(profiles) {
    return profiles.metadata.map(function(resource) {
      return new ProfileModel({
        resource: resource
      });
    });
  })
}

function getAllProfiles(req, reply) {
  getProfiles()
  .then(function(profiles) {
    reply.json({
      profiles: profiles
    });
  });
}

function getAllProfilesWithDetails(req, reply) {
  return getProfiles()
  .then(function(profiles) {

    var promises = profiles.map(function(profile) {
      return lxdClient.getProfile(profile.getName())
        .then(function(profileData) {
          if (!profileData.error) {
            profile.setData(profileData.metadata);
          }
          return profile;
        });
    });
    return Promise.all(promises);
  })
  .then(function(profiles) {
    reply.json({
      profiles: profiles
    });
  });
}
