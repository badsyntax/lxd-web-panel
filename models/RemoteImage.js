'use strict';

var BaseModel = require('./Base');

class RemoteImageModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.RemoteImageModel;
  }
}

module.exports = RemoteImageModel;
