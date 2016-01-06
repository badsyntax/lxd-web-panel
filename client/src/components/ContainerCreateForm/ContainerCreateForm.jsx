import './ContainerCreateForm.scss';
import React, { PropTypes } from 'react';
import ContainerCreateFieldset from './ContainerCreateFieldset';

import ContainerModel from '../../models/ContainerModel';

import Alert from '../Alert/Alert';
import Form from '../Form/Form';

export default class ContainerCreateForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func,
    images: PropTypes.array.isRequired,
    profiles: PropTypes.array.isRequired
  };

  static initialFormData = {
    profiles: []
  };

  constructor(...props) {
    super(...props);
    this.state = {
      formModel: this.getFormModel()
    };
  }

  getFormModel() {

    let initialData = this.constructor.initialFormData;

    let formModel = new ContainerModel(
      initialData,
      null,
      this.onFormModelChange
    );

    formModel.setRequired('profiles', true);
    formModel.setRequired('name', true);
    formModel.setRequired('image', true);

    return formModel;
  }

  onFormModelChange = (formModel) => {
    this.setState({
      formModel: formModel
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showError: true
    });
    console.log('FORM MODEL', this.state.formModel);
  }

  render() {
    return (
      <div className="container-create-form">
        { this.state.showError ? (
          <Alert
            icon="info-sign"
            message="There was an error submitting the form. Please correct the errors below."
            type="danger"
          />
        ) : '' }
        <Form
          className={'form-horizontal'}
          formModel={this.state.formModel}
          onSubmit={this.onSubmit}
        >
          <ContainerCreateFieldset
            disabled={this.props.disabled}
            images={this.props.images}
            profiles={this.props.profiles}
            showErrors={this.state.showError}
          />
        </Form>
      </div>
    );
  }
}
