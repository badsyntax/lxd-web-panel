var merge = require('deepmerge');

module.exports = BaseModel;

function BaseModel(data) {
  this.setData(data);
};

BaseModel.prototype.setData = function(data) {
  merge(this, data);
};

BaseModel.prototype.save = function() {};
