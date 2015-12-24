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
    name: PropTypes.string
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    Input
  };

  render() {
    let { Input } = this.props;

    let label = this.props.label ? (
      <label
        className={classNames(this.props.labelLayoutClassName, 'control-label')}
      >
        { this.props.label }
      </label>
    ) : '';

    let input = (
      <Input { ...this.props}
        className={'form-control'}
      />
    );

    return (
      <div className={this.props.className}>
        { label }
        { this.props.horizontal ? (
          <div className={this.props.inputLayoutClassName}>
            { input }
          </div>
        ) : input }
      </div>
    )
  }
}
