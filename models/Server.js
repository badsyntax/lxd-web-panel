'use strict';

var BaseModel = require('./Base');

class ServerModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.ServerModel;
  }
}

module.exports = ServerModel;
