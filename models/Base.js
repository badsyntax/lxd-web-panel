var util = require('util');
var revalidator = require('revalidator');

module.exports = BaseModel;

const privateKeys = new WeakMap();
const privateSchema = new WeakMap();
const privateValidation = new WeakMap();
const noop = function noop() {}

BaseModel.schema = require('./schema.json');

function BaseModel(data, schema, onChange) {

  privateSchema.set(this, Object.assign({}, schema));

  privateKeys.set(this, new Set(
    Object.keys(privateSchema.get(this).properties))
  );

  this.setData(data || {});
  this.onChange = onChange || noop;
};

BaseModel.prototype.setData = function(data) {
  Object.assign(this, data);
  this.validate();
};

BaseModel.prototype.save = function() {};

BaseModel.prototype.set = function(key, value) {
  if (!privateKeys.get(this).has(key)) {
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
  if (!privateKeys.get(this).has(key)) {
    throw new Error('Trying to get a property that has not been defined in schema (' + key + ')');
  }
  return this[key];
};

BaseModel.prototype.getData = function() {
  return Array.from(privateKeys.get(this)).reduce(function(data, key) {
    data[key] = this[key];
    return data;
  }.bind(this), {});
};

BaseModel.prototype.validate = function() {
  privateValidation.set(this, revalidator.validate(this.get(), privateSchema.get(this)));
};

BaseModel.prototype.isPropValid = function(prop) {
  this.validate();
  var propHasError = privateValidation.get(this).errors.reduce(function(hasError, error) {
    return hasError || error.property === prop;
  }, false);
  return !propHasError;
};

BaseModel.prototype.isValid = function() {
  return privateValidation.get(this).valid;
};

BaseModel.prototype.getPropValidationError = function(prop) {
  return privateValidation.get(this).errors.filter(function(error) {
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
  if (!privateSchema.get(this).properties[key]) {
    throw new Error('Unable to update schema for key "' + key + '", not defined in privateSchema.');
  }
  Object.assign(privateSchema.get(this).properties[key], data);
  this.validate();
};
