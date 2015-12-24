import React, {PropTypes} from 'react';

import Input from '../Input/Input';

export default class InputHorizontal extends React.Component {

  static propTypes = {
    wrapperClassName: PropTypes.string
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={this.props.wrapperClassName}>
        <Input {...this.props} />
      </div>
    );
  }
}
