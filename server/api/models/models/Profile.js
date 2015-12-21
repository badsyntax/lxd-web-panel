var BaseModel = require('./Base');

module.exports = ProfileModel;

function ProfileModel(data) {
  BaseModel.apply(this, [data]);
};

ProfileModel.factory = function(data) {
  return new ProfileModel(data);
};

ProfileModel.prototype = Object.create(BaseModel.prototype);
