import React, {PropTypes} from 'react';

export default class Input extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'text'
  }

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  }

  onChange = (e) => {
    let value = e.target.value;
    this.context.formModel.update(this.props.name, value);
  }

  render() {

    let { context, props } = this;

    let value = context.formModel.get(props.name) || props.defaultValue;

    return (
      <input
        {...props}
        className={'form-control'}
        onChange={this.onChange}
        type={props.type}
        value={value}
      />
    );
  }
}
