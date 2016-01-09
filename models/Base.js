'use strict';

var util = require('util');
var revalidator = require('revalidator');

const allModelsSchema = require('./schema.json');

const _keys = new WeakMap();
const _schema = new WeakMap();
const _validation = new WeakMap();
const _noop = () => {};

class BaseModel {

  static get schema() {
    return allModelsSchema;
  }

  constructor(data, onChange) {

    var schema = this.constructor.schema || {};
    _schema.set(this, Object.assign({}, schema));

    _keys.set(this, new Set(
      Object.keys(_schema.get(this).properties))
    );

    this.onChange = onChange || _noop;
    this.setData(data || {});
  }

  setData(data) {
    Object.keys(data).forEach((key) => {
      this.set(key, data[key]);
    });
    this.validate();
  }

  set(key, value) {
    if (!_keys.get(this).has(key)) {
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
    if (!_keys.get(this).has(key)) {
      throw new Error('Trying to get a property that has not been defined in schema (' + key + ')');
    }
    return this[key];
  }

  getData() {
    return Array
    .from(_keys.get(this))
    .reduce((data, key) => {
      data[key] = this[key];
      return data;
    }, {});
  }

  validate() {
    _validation.set(this, revalidator.validate(this.get(), _schema.get(this)));
  }

  isPropValid(prop) {
    this.validate();
    var propHasError = _validation.get(this).errors.reduce((hasError, error) => {
      return hasError || error.property === prop;
    }, false);
    return !propHasError;
  }

  isValid() {
    return _validation.get(this).valid;
  }

  getPropValidationError(prop) {
    return _validation.get(this).errors.filter((error) => {
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
    if (!_schema.get(this).properties[key]) {
      throw new Error('Unable to update schema for key "' + key + '", not defined in schema.');
    }
    Object.assign(_schema.get(this).properties[key], data);
    this.validate();
  }
};

module.exports = BaseModel;
