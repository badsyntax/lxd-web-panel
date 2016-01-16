'use strict';

import React, { PropTypes } from 'react';

export default class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.array.isRequired
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  hasOption = (option) => {
    return (this.props.value === option);
  };

  onChange = (e) => {
    let value = e.target.value;
    if (this.props.name) {
      this.context.formModel.set(this.props.name, value);
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    let select = (
      <select
        className={'form-control'}
        onChange={this.onChange}
        defaultValue={this.props.defaultValue}
        disabled={this.props.disabled}
      >
        { this.props.options.map((option, i) => {
          return (
            <option
              key={'option-' + this.props.name + '-' + i}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    );
    return select;
  }
}
