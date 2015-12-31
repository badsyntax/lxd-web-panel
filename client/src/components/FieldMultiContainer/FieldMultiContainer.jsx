import React from 'react';

function hasField(fields, field) {
  return (
    fields.indexOf(field) >= 0
  );
}

let getField = (field, formModel, i) => {
  var className = classNames({
    'checkbox': true,
    '-checked': this.hasField(field)
  });
  return (
    <li
      className={className}
      key={'field-' + i}
    >
      <label>
        <input
          checked={this.hasField(field)}
          data-index={i}
          type="checkbox"
          onChange={this.onChange}
        />
        { field.name }
      </label>
    </li>
  );
};

export default (props) => {
  let legendClassName = classNames(this.props.labelLayoutClassName, 'control-label');
  return (
    <fieldset className="form-group">
      <legend
        className={ legendClassName }
      >
        { this.props.label }
      </legend>
      <div className="col-sm-5">
        <ul className="container-create__fields">
          { props.field.map((field, i) => {
            return getfield(field, props.formModel, i);
          })) }
        </ul>
      </div>
    </fieldset>

    <fieldset className={props.className}>
      { props.labelComponent }
      { props.horizontal ? (
        <div className={props.inputLayoutClassName}>
          { props.inputComponent }
          { props.hasError ? (
            <span className="help-block">{ props.formModel.getPropValidationErrorMessage(props.name) }</span>
          ) : null }
        </div>
      ) : props.inputComponent }
    </div>
  );
}

