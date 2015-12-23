var revalidator = require('revalidator');

function FormView(schema, onChange) {
  this.schema = schema;
  this.values = {};
  this.onChange = onChange;
}

FormView.prototype.update = function(key, value) {
  this.values[key] = value;
  this.onChange(this);
  this.validate();
};

FormView.prototype.validate = function() {
  this.validation = revalidator.validate(this.values, this.schema);
};

module.exports = FormView;
