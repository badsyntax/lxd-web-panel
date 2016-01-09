'use strict';

import './CheckboxGroup.scss';
import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default class CheckboxGroup extends React.Component {

  state = {};

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
  };

  static defaultProps = {
    className: 'form-control'
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  onChange = (e) => {

    var option = e.target;
    var optionIndex = Number(option.dataset.index);
    var optionObject = this.props.options[optionIndex];

    var formModel = this.context.formModel;
    var modelOptions = formModel.get(this.props.name);
    var modelOptionIndex = modelOptions.indexOf(optionObject);

    if (option.checked && modelOptionIndex === -1) {
      modelOptions.push(optionObject);
    } else if (!option.checked) {
      modelOptions.splice(modelOptionIndex, 1);
    }

    formModel.update(this.props.name, modelOptions);

    this.forceUpdate();
  };

  hasOption(option) {
    let options = this.context.formModel[this.props.name];
    return (
      options.indexOf(option) >= 0
    );
  }

  render() {
    return (
      <ul className="checkbox-group__fields">
        { this.props.options.map((option, i) => {
          let className = classNames({
            'checkbox': true,
            '-checked': this.hasOption(option)
          });
          return (
            <li
              className={className}
              key={'option-' + i}
            >
              <label>
                <input
                  checked={this.hasOption(option)}
                  data-index={i}
                  onChange={this.onChange}
                  type="checkbox"
                />
                <span>{ option.name }</span>
              </label>
            </li>
          );
        }) }
      </ul>
    );
  }
}

