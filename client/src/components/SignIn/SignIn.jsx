import './SignIn.scss';
import React from 'react';

export default class SignIn extends React.Component {
  render() {
    return (
      <form className="form-signin">
        <h2 className="form-signin-heading">Please sign in</h2>
        <label for="inputUsername" className="sr-only">Username</label>
        <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
        <label for="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}
