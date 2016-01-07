'use strict';

var dateFormat = require('dateformat');
var filesize = require('filesize');
var BaseModel = require('./Base');

class ImageModel extends BaseModel {

  static get schema() {
    return BaseModel.schema.ImageModel;
  }

  get fingerprint() {
    if (!this.resource) {
      throw new Error('resource required to get fingerprint');
    }
    return this.resource.replace('/1.0/images/', '');
  }

  get createdAtFriendly() {
    return dateFormat(this.created_at * 1000, 'dS mmmm yyyy');
  }

  get sizeFriendly() {
    return filesize(this.size);
  }

  alias() {
    return (this.aliases && this.aliases.length && this.aliases[0].target) || null;
  }
}

module.exports = ImageModel;
