import './SignInForm.scss';
import React, {PropTypes} from 'react';
import { FormView } from '../../models';

import Form from '../Form/Form';
import Field from '../Field/Field';
import Alert from '../Alert/Alert';

import { UserModel } from '../../models'

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
    error: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  constructor(...props) {
    super(...props);

    var formModel = new UserModel(null, null, this.onChange);
    formModel.setRequired('username', true);
    formModel.setRequired('password', true);

    this.state = { formModel }
  }

  onChange = (formModel) => {
    this.setState({
      formModel: formModel
    });
  }

  onSubmit = (e) => {
    this.props.onSubmit(e, this.state.formModel);
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
        formModel={this.state.formModel}
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
