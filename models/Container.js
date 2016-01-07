'use strict';

var BaseModel = require('./Base');

class ContainerModel extends BaseModel {

  static get schema() {
    return BaseModel.schema.ContainerModel;
  }

  get name() {
    if (!this.resource) {
      throw new Error('resource required to get name');
    }
    return this.resource.replace('/1.0/containers/', '');
  }

  getAddress(protocol, intface) {
    var ip = this.status.ips.filter((ip) => {
      return ip.protocol === protocol && ip.interface === intface;
    })[0];
    return ip && ip.address && ip.address + ' (' + intface + ')';
  }
}

module.exports = ContainerModel;
