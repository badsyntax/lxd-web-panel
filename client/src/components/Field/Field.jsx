import React, {PropTypes} from 'react';
import Input from '../Input/Input';

export default class Field extends React.Component {

  static propTypes = {
    ...React.Component.propTypes,
    label: PropTypes.string,
    name: PropTypes.string,
    Input: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  };

  static contextTypes = {
    formView: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    Input
  };

  render() {
    let {Input, label, children} = this.props;
    return (
      <div className={this.props.className}>
        { this.props.label ? (<label>{ this.props.label }</label>) : '' }
        <Input { ...this.props}
          className={'form-control'}
         />
      </div>
    )
  }
}
