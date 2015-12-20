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

ProfileModel.prototype.save = function() {
  return lxdClient.createProfile({
    name: this.name,
    architecture: 'x86_64',
    profiles: ['default'],
    source: {
      type: 'image',
      alias: 'ubuntu'
    }
  });
};
