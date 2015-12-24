var BaseModel = require('./Base');

module.exports = ContainerModel;

ContainerModel.schema = BaseModel.schema.ContainerModel;

function ContainerModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || ContainerModel.schema, onChange);
};

ContainerModel.factory = function(data) {
  return new ContainerModel(data);
};

ContainerModel.prototype = Object.create(BaseModel.prototype);

ContainerModel.prototype.getName = function() {
  if (!this.resource) {
    throw new Error('resource required to get name');
  }
  return this.resource.replace('/1.0/containers/', '');
};
