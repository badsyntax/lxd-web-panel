'use strict';

import './SignIn.scss';
import React, {PropTypes} from 'react';

import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import SignInForm from '../../components/SignInForm/SignInForm';

import {
  AUTHENTICATE__SUCCESS,
  AUTHENTICATE__ERROR,
  AUTHENTICATE__START,
  AUTHENTICATE__END
} from '../../constants/AppConstants';

export default class SignIn extends React.Component {

  state = {};

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static childContextTypes = {
    location: React.PropTypes.object
  };

  constructor(...props) {
    super(...props);
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
        var state = this.props.location.state;
        var pathName = state && state.nextPathname || '/';
        this.context.router.push(pathName);
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
  };

  onSubmit = (e, formModel) => {
    e.preventDefault();
    if (formModel.isValid()) {
      this.setState({
        hasError: false
      });
      AppActions.authenticate(formModel.get());
    } else {
      this.setState({
        hasError: true
      });
    }
  };

  render() {
    return (
      <div
        className="sign-in"
      >
        <SignInForm
          disabled={this.state.isFormLoading}
          error={this.state.hasError}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
