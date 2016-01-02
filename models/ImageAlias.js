var dateFormat = require('dateformat');
var filesize = require('filesize');
var BaseModel = require('./Base');

module.exports = ImageAliasModel;

ImageAliasModel.schema = BaseModel.schema.ImageAliasModel;

function ImageAliasModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ImageAliasModel.schema, onChange);
};

ImageAliasModel.factory = function(data) {
  return new ImageAliasModel(data);
};

ImageAliasModel.prototype = Object.create(BaseModel.prototype);

ImageAliasModel.prototype.getAlias = function() {
  if (!this.resource) {
    throw new Error('resource required to get alias');
  }
  return this.resource.replace('/1.0/images/aliases/', '');
};

