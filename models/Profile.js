var BaseModel = require('./Base');

module.exports = ProfileModel;

ProfileModel.schema = BaseModel.schema.ProfileModel;

function ProfileModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ProfileModel.schema, onChange);
};

ProfileModel.factory = function(data) {
  return new ProfileModel(data);
};

ProfileModel.prototype = Object.create(BaseModel.prototype);

ProfileModel.prototype.getName = function() {
  if (!this.resource) {
    throw new Error('resource required to get name');
  }
  return this.resource.replace('/1.0/profiles/', '');
};

ProfileModel.prototype.getFriendlyDevices = function() {
  return Object.keys(this.devices).map(function(key) {
    var device = this.devices[key];
    return [ key, device.parent, device.nictype ].join(' - ');
  }, this).join(' | ');
};