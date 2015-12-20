var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();

module.exports = ProfileModel;

function ProfileModel(data) {
  this.data = data;
  this.name = data.name.replace('/1.0/profiles/', '');
};

ProfileModel.factory = function(data) {
  return new ProfileModel(data);
};

ProfileModel.prototype.setData = function(data) {
  this.data = data;
};

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
