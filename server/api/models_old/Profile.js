var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var BaseModel = require('./Base');

module.exports = ProfileModel;

function ProfileModel(data) {
  BaseModel.apply(this, arguments);
  this.name = this.data.name.replace('/1.0/profiles/', '');
};

ProfileModel.factory = function(data) {
  return new ProfileModel(data);
};

ProfileModel.prototype = Object.create(BaseModel.prototype);
