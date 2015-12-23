import './SignIn.scss';
import React, {PropTypes} from 'react';

import AuthStore from '../../stores/AuthStore';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppActions from '../../actions/AppActions';

import SignInForm from '../SignInForm/SignInForm';

import {
  AUTHENTICATE__SUCCESS,
  AUTHENTICATE__ERROR,
  AUTHENTICATE__START,
  AUTHENTICATE__END
} from '../../constants/AppConstants';

export default class SignIn extends React.Component {

  state = {}

  static contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  };

  constructor(...props) {
    super(...props)
    this.actionHandler = AppDispatcher.register(this.onAction);
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.actionHandler);
  }

  onAction = (action) => {
    switch(action.actionType) {
      case AUTHENTICATE__ERROR:
        this.setState({
          hasError: true
        });
        break;
      case AUTHENTICATE__SUCCESS:
        var pathName = this.context.location.state.nextPathname;
        this.context.history.pushState(null, pathName);
        break;
      case AUTHENTICATE__START:
        this.setState({
          hasError: false,
          isFormLoading: true
        });
        break;
      case AUTHENTICATE__END:
        this.setState({
          isFormLoading: false
        });
        break;
      default:
    }
  }

  onSubmit = (e, formView) => {
    e.preventDefault();
    AppActions.authenticate(formView.values);
  }

  render() {
    return (
      <SignInForm
        disabled={this.state.isFormLoading}
        error={this.state.hasError}
        onSubmit={this.onSubmit}
      />
    );
  }
}
