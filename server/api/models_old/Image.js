var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();
var BaseModel = require('./Base');

module.exports = ImageModel;

function ImageModel(data) {
  BaseModel.apply(this, arguments);
  this.fingerprint = data.fingerprint && data.fingerprint.replace('/1.0/images/', '') || null;
  this.alias = data.aliases && data.aliases[0].target || null;
  this.type = data.type || null;
};

ImageModel.factory = function(data) {
  return new ImageModel(data);
};

ImageModel.prototype = Object.create(BaseModel.prototype);

ImageModel.prototype.setData = function() {
  BaseModel.prototype.setData.apply(this, arguments);
  this.alias = this.data.aliases && this.data.aliases[0].target || null;
  console.log('SET DATA', this.data);
};
