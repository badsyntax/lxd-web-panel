import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Input from '../Input/Input';

export default class Field extends React.Component {

  static propTypes = {
    ...React.Component.propTypes,
    horizontal: PropTypes.bool,
    Input: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    label: PropTypes.string,
    labelLayoutClassName: PropTypes.string,
    name: PropTypes.string,
    showError: PropTypes.bool
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    Input,
    horizontal: false
  };

  render() {

    let { Input } = this.props;

    let formModel = this.context.formModel;
    let hasError = this.props.showError && !formModel.isPropValid(this.props.name);

    let className = classNames(
      this.props.className,
      hasError ? 'has-error' : null
    );

    let inputComponent = (
      <Input { ...this.props}
        className={'form-control'}
      />
    );

    return (
      <div className={className}>
        { this.props.label ? (
          <label
            className={classNames(this.props.labelLayoutClassName, 'control-label')}
          >
            { this.props.label }
          </label>
        ) : '' }
        { this.props.horizontal ? (
          <div className={this.props.inputLayoutClassName}>
            { inputComponent }
            { hasError ? (
              <span className="help-block">{ formModel.getPropValidationErrorMessage(this.props.name) }</span>
            ) : null }
          </div>
        ) : inputComponent }
      </div>
    );
  }
}
