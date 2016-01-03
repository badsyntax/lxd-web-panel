var dateFormat = require('dateformat');
var filesize = require('filesize');
var BaseModel = require('./Base');
var ImageCreateModel = require('./ImageCreate');

module.exports = ImageImportModel;

ImageImportModel.schema = BaseModel.schema.ImageImportModel;

function ImageImportModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ImageImportModel.schema, onChange);
};

ImageImportModel.factory = function(data) {
  return new ImageImportModel(data);
};

ImageImportModel.prototype = Object.create(BaseModel.prototype);

ImageImportModel.prototype.getCreateModel = function() {
  return new ImageCreateModel({
    public: this.public,
    source: {
      type: 'image',
      mode: 'pull',
      server: this.server,
      alias: this.remoteAlias
    }
  });
};

