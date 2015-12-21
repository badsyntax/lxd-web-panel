module.exports = BaseModel;

function BaseModel(data) {
  this.setData(data || {});
};

BaseModel.prototype.setData = function(data) {
  Object.assign(this, data);
};

BaseModel.prototype.save = function() {};
