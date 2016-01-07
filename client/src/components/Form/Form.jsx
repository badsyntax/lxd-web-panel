import React, {PropTypes} from 'react';



export default class Form extends React.Component {

  static propTypes = {
    formModel: PropTypes.object.isRequired
  };

  static childContextTypes = {
    formModel: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      formModel: this.props.formModel
    };
  }

  render() {
    return (
      <form {...this.props} formModel={this.props.formModel}>
        {this.props.children}
      </form>
    );
  }
}
