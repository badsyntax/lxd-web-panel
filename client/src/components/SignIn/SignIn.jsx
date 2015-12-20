import './SignIn.scss';
import React from 'react';

import AuthStore from '../../stores/AuthStore';
import WebAPI from '../../util/WebAPI';

function getInitialState() {
  return {
    username: 'rich',
    password: 'foo'
  };
}

export default class SignIn extends React.Component {

  static contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  };

  state = getInitialState()

  onChange = (e) => {
    this.setState({
      username: this.refs.form.inputUsername.value,
      password: this.refs.form.inputPassword.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    WebAPI.authenticate(this.state)
    .then(function(response) {
      AuthStore.setToken(response.token);
      this.context.history.pushState('home');
    }.bind(this))
  }

  render() {
    return (
      <form ref={'form'} className={'form-signin'} onSubmit={this.onSubmit}>
        <h2 className={'form-signin-heading'}>
          Please sign in
        </h2>
        <label
          htmlFor={'inputUsername'}
          className={'sr-only'}>
          Username
        </label>
        <input
          value={this.state.username}
          required autoFocus
          onChange={this.onChange}
          type={'username'}
          id={'inputUsername'}
          className={'form-control'}
          placeholder={'Username'} />
        <label
          htmlFor={'inputPassword'}
          className={'sr-only'}>
          Password
        </label>
        <input
          value={this.state.password}
          onChange={this.onChange}
          type={'password'}
          id={'inputPassword'}
          className={'form-control'}
          placeholder={'Password'}
          required />
        <button
          className={'btn btn-lg btn-primary btn-block'}
          type={'submit'}>
          Sign in
        </button>
      </form>
    );
  }
}
