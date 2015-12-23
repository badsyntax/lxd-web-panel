var BaseModel = require('./Base');

module.exports = ProfileModel;

function ProfileModel(data) {
  BaseModel.apply(this, [data]);
};

ProfileModel.factory = function(data) {
  return new ProfileModel(data);
};

ProfileModel.prototype = Object.create(BaseModel.prototype);

ProfileModel.prototype.getFriendlyDevices = function() {
  return Object.keys(this.devices).map(function(key) {
    var device = this.devices[key];
    return [ key, device.parent, device.nictype ].join(' - ');
  }, this).join(' | ');
};
