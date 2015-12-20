var helpers = require('../helpers');
var lxdClient = helpers.getLXDClient();

module.exports = ContainerModel;

function ContainerModel(data) {
  this.data = data;
  this.name = data.name.replace('/1.0/containers/', '');
};

ContainerModel.factory = function(data) {
  return new ContainerModel(data);
};

ContainerModel.prototype.setData = function(data) {
  this.data = data;
};

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
