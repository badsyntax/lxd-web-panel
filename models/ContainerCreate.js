'use strict';

var BaseModel = require('./Base');

class ContainerCreateModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.ContainerCreateModel;
  }
}

module.exports = ContainerCreateModel;
