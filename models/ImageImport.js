'use strict';

var BaseModel = require('./Base');
var ImageCreateModel = require('./ImageCreate');

class ImageImportModel extends BaseModel {
  static get schema() {
    return BaseModel.schema.ImageImportModel;
  }
}

module.exports = ImageImportModel;
