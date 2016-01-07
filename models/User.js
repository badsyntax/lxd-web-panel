'use strict';

var BaseModel = require('./Base');

class UserModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.UserModel;
  }
}

module.exports = UserModel;
