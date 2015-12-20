var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var BaseModel = require('./Base');

module.exports = ImageModel;

function ImageModel(data) {
  BaseModel.apply(this, arguments);
  this.name = this.data.name.replace('/1.0/images/', '');
};

ImageModel.factory = function(data) {
  return new ImageModel(data);
};

ImageModel.prototype = Object.create(BaseModel.prototype);
