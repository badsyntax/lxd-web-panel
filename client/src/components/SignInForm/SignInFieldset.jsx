import React, {PropTypes} from 'react';
import Field from '../Field/Field';

export default class SignIFieldset extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    showErrors: PropTypes.bool
  }

  render() {
    return (
      <fieldset className="sign-in-form__fieldset">
        <Field
          autoFocus
          disabled={this.props.disabled}
          name="username"
          placeholder="Username"
          showError={this.props.showErrors}
        />
        <Field
          disabled={this.props.disabled}
          name="password"
          placeholder="Password"
          type="password"
          showError={this.props.showErrors}
        />
        <button
          className={'btn btn-lg btn-primary btn-block'}
          disabled={this.props.disabled}
          type={'submit'}
        >
          Sign in
        </button>
      </fieldset>
    );
  }
}
