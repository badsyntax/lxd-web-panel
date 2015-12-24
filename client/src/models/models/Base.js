var revalidator = require('revalidator');

module.exports = BaseModel;

let noop = () => {};

BaseModel.schema = require('../schema.json');

function BaseModel(data, schema, onChange) {
  this._keys = new Set();
  this.setData(data || {});
  this.schema = Object.assign({}, schema);
  this.onChange = onChange || noop;
};

BaseModel.prototype.setData = function(data) {
  Object.assign(this, data);
  Object.keys(data).forEach(this._keys.add.bind(this._keys));
};

BaseModel.prototype.save = function() {};

BaseModel.prototype.update = function(key, value) {
  this[key] = value;
  this._keys.add(key);
  this.validate();
  this.onChange(this);
};

BaseModel.prototype.get = function(key) {
  if (this._keys.has(key)) {
    return this[key];
  }
  return undefined;
};

BaseModel.prototype.getData = function() {
  return Object.keys(this).reduce(function(data, key) {
    if (this._keys.has(key)) {
      data[key] = this[key];
    }
    return data;
  }.bind(this), {});
};

BaseModel.prototype.validate = function() {
  this.validation = revalidator.validate(this.getData(), this.schema);
};

BaseModel.prototype.setRequired = function(key) {
  this.updateSchema(key, {
    required: true
  });
};

BaseModel.prototype.updateSchema = function(key, data) {
  if (!this.schema.properties[key]) {
    throw new Error('Unable to update schema for', key);
  }
  Object.assign(this.schema.properties[key], data);
};
