import React, {PropTypes} from 'react';



export default class Form extends React.Component {

  static propTypes = {
    formView: PropTypes.object.isRequired
  }

  static childContextTypes = {
    formView: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      formView: this.props.formView
    };
  }

  render() {
    return (
      <form {...this.props} formView={this.props.formView}>
        {this.props.children}
      </form>
    );
  }
}
