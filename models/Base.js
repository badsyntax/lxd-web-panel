var util = require('util');
var path = require('path');
var revalidator = require('revalidator');

module.exports = BaseModel;

function noop() {}

BaseModel.schema = require('./schema.json');

function BaseModel(data, schema, onChange) {
  this.schema = Object.assign({}, schema);
  this._keys = new Set(Object.keys(this.schema.properties));
  this.setData(data || {});
  this.onChange = onChange || noop;
};

BaseModel.prototype.setData = function(data) {
  Object.assign(this, data);
  this.validate();
};

BaseModel.prototype.save = function() {};

BaseModel.prototype.set = function(key, value) {
  if (!this._keys.has(key)) {
    throw new Error('Trying to set a property that has not been defined in schema (' + key + ')');
  }
  this[key] = value;
  this.validate();
  this.onChange(this);
};

BaseModel.prototype.update = function(key, value) {
  this.set(key, value);
};

BaseModel.prototype.get = function(key) {
  if (!key) {
    return this.getData();
  }
  if (!this._keys.has(key)) {
    throw new Error('Trying to get a property that has not been defined in schema (' + key + ')');
  }
  return this[key];
};

BaseModel.prototype.getData = function() {
  return Array.from(this._keys).reduce(function(data, key) {
    data[key] = this[key];
    return data;
  }.bind(this), {});
};

BaseModel.prototype.validate = function() {
  this.validation = revalidator.validate(this.getData(), this.schema);
};

BaseModel.prototype.isPropValid = function(prop) {
  this.validate();
  var propHasError = this.validation.errors.reduce(function(hasError, error) {
    return hasError || error.property === prop;
  }, false);
  return !propHasError;
};

BaseModel.prototype.isValid = function() {
  return this.validation.valid;
};

BaseModel.prototype.getPropValidationError = function(prop) {
  return this.validation.errors.filter(function(error) {
    return error.property === prop;
  })[0] || {};
};

BaseModel.prototype.getPropValidationErrorMessage = function(prop) {
  var error = this.getPropValidationError(prop);
  return util.format('%s %s', prop, error.message);
};

BaseModel.prototype.setRequired = function(key, required) {
  this.updateSchema(key, { required });
};

BaseModel.prototype.updateSchema = function(key, data) {
  if (!this.schema.properties[key]) {
    throw new Error('Unable to update schema for key "' + key + '", not defined in schema.');
  }
  Object.assign(this.schema.properties[key], data);
  this.validate();
};
