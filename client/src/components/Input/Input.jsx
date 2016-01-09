'use strict';

import React, {PropTypes} from 'react';

export default class Input extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'text',
    className: 'form-control'
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  onChange = (e) => {
    let value = e.target.value;
    let formModel = this.context.formModel;
    formModel.set(this.props.name, value);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {

    let { context, props } = this;
    let value = null;

    try {
      value = context.formModel.get(props.name) || props.defaultValue;
    } catch(e) {
      window.alert(e);
    }

    return (
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}
