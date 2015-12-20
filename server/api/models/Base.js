module.exports = BaseModel;

function BaseModel(data) {
  this.data = data;
};

BaseModel.prototype.setData = function(data) {
  this.data = data;
};

BaseModel.prototype.save = function() {};
