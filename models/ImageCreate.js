var BaseModel = require('./Base');

module.exports = ImageCreateModel;

ImageCreateModel.schema = BaseModel.schema.ImageCreateModel;

function ImageCreateModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ImageCreateModel.schema, onChange);
};

ImageCreateModel.factory = function(data) {
  return new ImageCreateModel(data);
};

ImageCreateModel.prototype = Object.create(BaseModel.prototype);

