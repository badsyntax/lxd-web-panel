import React, { PropTypes } from 'react';

export default class Select extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    name: PropTypes.string.isRequired,
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
    let formModel = this.context.formModel;
    formModel.update(this.props.name, value);
    this.props.onChange(e);
  };

  render() {
    try {
      let select = (
        <select
          className={'form-control'}
          onChange={this.onChange}
          defaultValue={this.props.value}
        >
          <option value="">Please select...</option>
          { this.props.options.map((option, i) => {
            return (
              <option
                key={'option-' + this.props.name + '-' + i}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
      return select;

    } catch(e) {
      alert(e);
    }

  }
}
