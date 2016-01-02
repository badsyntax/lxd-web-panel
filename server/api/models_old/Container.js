var helpers = require('../helpers');
var lxdClient = helpers.lxd;
var BaseModel = require('./Base');

module.exports = ContainerModel;

function ContainerModel(data) {
  BaseModel.apply(this, arguments);
  this.name = this.data.name.replace('/1.0/containers/', '');
};

ContainerModel.factory = function(data) {
  return new ContainerModel(data);
};

ContainerModel.prototype = Object.create(BaseModel.prototype);

ContainerModel.prototype.save = function() {
  return lxdClient.createContainer({
    name: this.name,
    architecture: 'x86_64',
    profiles: ['default'],
    source: {
      type: 'image',
      alias: 'ubuntu'
    }
  });
};
