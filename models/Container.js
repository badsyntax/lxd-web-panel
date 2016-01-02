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

ContainerModel.prototype.getAddress = function(protocol, intface) {
  var ip = this.status.ips.filter((ip) => {
    return ip.protocol === protocol && ip.interface === intface;
  })[0];
  return ip && ip.address && ip.address + ' (' + intface + ')';
};
