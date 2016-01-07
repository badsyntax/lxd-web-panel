'use strict';

var BaseModel = require('./Base');

class ImageCreateModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.ImageCreateModel;
  }
}

module.exports = ImageCreateModel;
