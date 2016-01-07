'use strict';

var BaseModel = require('./Base');
var ImageCreateModel = require('./ImageCreate');

class ImageImportModel extends BaseModel {

  static get schema() {
    return BaseModel.schema.ImageImportModel;
  }

  getCreateModel() {
    return new ImageCreateModel({
      public: this.public,
      source: {
        type: 'image',
        mode: 'pull',
        server: this.server,
        alias: this.remoteAlias
      }
    });
  }
}

module.exports = ImageImportModel;
