import './SignInForm.scss';
import React, {PropTypes} from 'react';

import Form from '../Form/Form';
import Alert from '../Alert/Alert';

import UserModel from '../../models/UserModel';
import SignInFieldset from './SignInFieldset';


export default class SignInForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  constructor(...props) {
    super(...props);

    let initialData = {
      username: 'rich',
      password: 'foo'
    };

    let formModel = new UserModel(initialData, null, this.onChange);
    formModel.setRequired('username', true);
    formModel.setRequired('password', true);

    this.state = { formModel };
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
    let error = this.props.error ? (
      <Alert
        message="Sorry, there was an error signing you in. Please try again."
        type="danger"
        icon="info-sign"
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
        <SignInFieldset
          showErrors={this.props.error}
          disabled={this.props.disabled} />
        { error }
      </Form>
    );
  }
}
