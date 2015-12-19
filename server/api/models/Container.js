module.exports = ContainerModel;

function ContainerModel(data) {
	this.data = data;
  this.name = data.name;
}

ContainerModel.factory = function(data) {
  return new ContainerModel(data);
};
