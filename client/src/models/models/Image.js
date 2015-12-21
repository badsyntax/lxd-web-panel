var moment = require('moment');
var filesize = require('filesize');
var BaseModel = require('./Base');


function ImageModel(data) {
  BaseModel.apply(this, [data]);
};

ImageModel.factory = function(data) {
  return new ImageModel(data);
};

ImageModel.prototype = Object.create(BaseModel.prototype);

ImageModel.prototype.getFingerprint = function() {
  if (!this.resource) {
    throw new Error('resource required to get fingerprint');
  }
  return this.resource.replace('/1.0/images/', '');
};

ImageModel.prototype.createdAtFriendly = function() {
  return moment(this.created_at * 1000).format('Do MMMM YYYY');
};

ImageModel.prototype.sizeFriendly = function() {
  return filesize(this.size);
};

ImageModel.prototype.getAlias = function() {
  return this.aliases && this.aliases[0].target;
};

module.exports = ImageModel;

