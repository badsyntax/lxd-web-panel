'use strict';

var BaseModel = require('./Base');

class ImageAliasModel extends BaseModel {

  static get schema() {
    return BaseModel.schema.ImageAliasModel;
  }

  get alias() {
    if (!this.resource) {
      throw new Error('resource required to get alias');
    }
    return this.resource.replace('/1.0/images/aliases/', '');
  }
};

module.exports = ImageAliasModel;
