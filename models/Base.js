'use strict';

var util = require('util');
var revalidator = require('revalidator');

const schema = require('./schema.json');
const privateKeys = new WeakMap();
const privateSchema = new WeakMap();
const privateValidation = new WeakMap();
const noop = () => {};

class BaseModel {

  static get schema() {
    return schema;
  }

  constructor(data, onChange) {

    var schema = this.constructor.schema || {};
    privateSchema.set(this, Object.assign({}, schema));

    privateKeys.set(this, new Set(
      Object.keys(privateSchema.get(this).properties))
    );

    this.setData(data || {});
    this.onChange = onChange || noop;
  }

  setData(data) {
    Object.assign(this, data);
    this.validate();
  }

  set(key, value) {
    if (!privateKeys.get(this).has(key)) {
      throw new Error('Trying to set a property that has not been defined in schema (' + key + ')');
    }
    this[key] = value;
    this.validate();
    this.onChange(this);
  }

  update(key, value) {
    this.set(key, value);
  }

  get(key) {
    if (!key) {
      return this.getData();
    }
    if (!privateKeys.get(this).has(key)) {
      throw new Error('Trying to get a property that has not been defined in schema (' + key + ')');
    }
    return this[key];
  }

  getData() {
    return Array
    .from(privateKeys.get(this))
    .reduce((data, key) => {
      data[key] = this[key];
      return data;
    }, {});
  }

  validate() {
    privateValidation.set(this, revalidator.validate(this.get(), privateSchema.get(this)));
  }

  isPropValid(prop) {
    this.validate();
    var propHasError = privateValidation.get(this).errors.reduce((hasError, error) => {
      return hasError || error.property === prop;
    }, false);
    return !propHasError;
  }

  isValid() {
    return privateValidation.get(this).valid;
  }

  getPropValidationError(prop) {
    return privateValidation.get(this).errors.filter((error) => {
      return error.property === prop;
    })[0] || {};
  }

  getPropValidationErrorMessage(prop) {
    var error = this.getPropValidationError(prop);
    return util.format('%s %s', prop, error.message);
  }

  setRequired(key, required) {
    this.updateSchema(key, { required });
  }

  updateSchema(key, data) {
    if (!privateSchema.get(this).properties[key]) {
      throw new Error('Unable to update schema for key "' + key + '", not defined in privateSchema.');
    }
    Object.assign(privateSchema.get(this).properties[key], data);
    this.validate();
  }
};

module.exports = BaseModel;
