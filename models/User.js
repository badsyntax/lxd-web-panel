var BaseModel = require('./Base');

module.exports = UserModel;

UserModel.schema = BaseModel.schema.UserModel;

function UserModel(data, schema, onChange) {
  BaseModel.call(this, data, schema || UserModel.schema, onChange);
};

UserModel.factory = function(data) {
  return new UserModel(data);
};

UserModel.prototype = Object.create(BaseModel.prototype);
