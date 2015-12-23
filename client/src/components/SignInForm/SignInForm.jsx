import './SignInForm.scss';
import React, {PropTypes} from 'react';
import { FormView } from '../../models';

import Form from '../Form/Form';
import Field from '../Field/Field';
import Alert from '../Alert/Alert';

let schema = {
  properties: {
    username: {
      description: 'Your username',
      type: 'string',
      required: true
    },
    password: {
      description: 'Your password',
      type: 'string',
      required: true
    }
  }
};

class SignInUserFieldset extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool
  }

  render() {
    return (
      <fieldset className="sign-in-form__fieldset">
        <Field
          autoFocus
          disabled={this.props.disabled}
          name="username"
          placeholder="Username"
        />
        <Field
          disabled={this.props.disabled}
          name="password"
          placeholder="Password"
          type="password"
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

export default class SignInForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool
  }

  constructor(...props) {
    super(...props);

    this.state = {
      formView: new FormView(schema, this.onChange)
    }
  }

  onChange = (formView) => {
    this.setState({
      formView: formView
    });
  }

  onSubmit = (e) => {
    this.props.onSubmit(e, this.state.formView);
  }

  render() {
    var error = this.props.error ? (
      <Alert
        message="Sorry, there was an error signing you in. Please try again."
        type="danger"
      />
    ) : '';
    return (
      <Form
        className={'sign-in-form'}
        formView={this.state.formView}
        onSubmit={this.onSubmit}
      >
        <h2 className={'sign-in-form__heading'}>
          Please sign in
        </h2>
        <SignInUserFieldset disabled={this.props.disabled} />
        { error }
      </Form>
    )
  }
}
