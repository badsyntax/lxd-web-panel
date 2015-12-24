var dateFormat = require('dateformat');
var filesize = require('filesize');
var BaseModel = require('./Base');

module.exports = ImageModel;

ImageModel.schema = BaseModel.schema.ImageModel;

function ImageModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ImageModel.schema, onChange);
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
  return dateFormat(this.created_at * 1000, 'dS mmmm yyyy');
};

ImageModel.prototype.sizeFriendly = function() {
  return filesize(this.size);
};

ImageModel.prototype.getAlias = function() {
  return this.aliases && this.aliases[0].target;
};


