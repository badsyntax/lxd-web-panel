'use strict';

var Promise = require('bluebird');
var helpers = require('../helpers');
var lxdClient = helpers.lxd;

var ProfileModel = require('../models/Profile');

module.exports = {
  getAllProfiles,
  getAllProfilesWithDetails
};

var config = process.env;

function getProfiles() {
  return lxdClient.getProfiles()
  .then((profiles) => {
    return profiles.metadata.map((resource) => {
      return new ProfileModel({
        resource: resource
      }).get();
    });
  })
}

function getAllProfiles(req, reply) {
  getProfiles()
  .then((profiles) => {
    reply.json({
      profiles: profiles
    });
  });
}

function getAllProfilesWithDetails(req, reply) {
  return getProfiles()
  .then((profiles) => {

    var promises = profiles.map((profileData) => {
      let profile = new ProfileModel(profileData);
      return lxdClient.getProfile(profile.name)
        .then((res) => {
          if (!res.error) {
            profile.setData(res.metadata);
          }
          return profile.get();
        });
    });
    return Promise.all(promises);
  })
  .then((profiles) => {
    reply.json({
      profiles: profiles
    });
  });
}
