'use strict';

var BaseModel = require('./Base');

class ProfileModel extends BaseModel {

  static get schema() {
    return BaseModel.schema.ProfileModel;
  }

  get name() {
    if (this._name) {
      return this._name;
    }
    if (!this.resource) {
      throw new Error('resource required to get name');
    }
    this._name = this.resource.replace('/1.0/profiles/', '');
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get friendlyDevices() {
    return Object.keys(this.devices).map((key) => {
      var device = this.devices[key];
      return [ key, device.parent, device.nictype ].join(' - ');
    }, this).join(' | ');
  }
};

module.exports = ProfileModel;
