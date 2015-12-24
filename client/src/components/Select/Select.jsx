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
  }

  hasOption = (otion) => {
    return (this.props.value === option);
  }

  render() {
    let select = (
      <select
        className={'form-control'}
        onChange={this.onChange}
      >
        <option>Please select...</option>
        { this.props.options.map((option, i) => {
          return (
            <option
              key={'option-' + this.props.name + '-' + i}
              selected={this.hasOption(option)}
              value={option.alias}
            >
              {option.alias}
            </option>
          );
        })}
      </select>
    );

    return select;
  }
}
