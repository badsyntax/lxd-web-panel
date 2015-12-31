import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Input from '../Input/Input';
import FieldContainer from '../FieldContainer/FieldContainer';

export default class Field extends React.Component {

  static propTypes = {
    ...React.Component.propTypes,
    horizontal: PropTypes.bool,
    Input: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    FieldContainer: PropTypes.oneOfType([
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
  }

  static defaultProps = {
    Input,
    FieldContainer,
    horizontal: false
  };

  render() {

    let {
      Input,
      FieldContainer
    } = this.props;

    let labelComponent = this.props.label ? (
      <label
        className={classNames(this.props.labelLayoutClassName, 'control-label')}
      >
        { this.props.label }
      </label>
    ) : '';

    let inputComponent = (
      <Input { ...this.props}
        className={'form-control'}
      />
    );

    let formModel = this.context.formModel;
    let hasError = this.props.showError && !formModel.isPropValid(this.props.name);

    let className = classNames(
      this.props.className,
      hasError ? 'has-error' : null
    );

    return (
      <FieldContainer
        { ...this.props}
        formModel={formModel}
        className={className}
        labelComponent={labelComponent}
        inputComponent={inputComponent}
        hasError={hasError}
      />
    );
  }
}
