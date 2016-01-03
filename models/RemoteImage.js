var BaseModel = require('./Base');

module.exports = RemoteImageModel;

RemoteImageModel.schema = BaseModel.schema.RemoteImageModel;

function RemoteImageModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || RemoteImageModel.schema, onChange);

  Object.defineProperty(this, 'value', {
    get: function () {
      return this.alias;
    }
  });

  Object.defineProperty(this, 'label', {
    get: function () {
      return this.description;
    }
  });
};

RemoteImageModel.factory = function(data) {
  return new RemoteImageModel(data);
};

RemoteImageModel.prototype = Object.create(BaseModel.prototype);
