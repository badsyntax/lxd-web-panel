var path = require('path');
var revalidator = require('revalidator');

module.exports = BaseModel;

let noop = () => {};

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

BaseModel.prototype.update = function(key, value) {
  if (!this._keys.has(key)) {
    throw new Error('Trying to update a property that has not been defined in schema');
  }
  this[key] = value;
  this.validate();
  this.onChange(this);
};

BaseModel.prototype.get = function(key) {
  if (!this._keys.has(key)) {
    throw new Error('Trying to get a property that has not been defined in schema');
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
