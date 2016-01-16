'use strict';

import './ContainerCreateForm.scss';
import React, { PropTypes } from 'react';

import AppActions from '../../actions/AppActions';

import ContainerCreateFieldset from './ContainerCreateFieldset';
import ContainerCreateModel from '../../models/ContainerCreateModel';

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

  initialFormData = {
    name: '',
    image: '',
    profiles: []
  };

  constructor(...props) {
    super(...props);

    let formModel = new ContainerCreateModel(
      this.initialFormData,
      this.onFormModelChange
    );

    this.state = { formModel };
  }

  onFormModelChange = (formModel) => {
    this.setState({
      formModel: formModel
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let formModel = this.state.formModel;

    this.setState({
      hasError: !formModel.isValid()
    });

    if (formModel.isValid()) {
      AppActions.createContainer(formModel);
    }
  };

  getImageOptions() {

    let defaultOptions = [{
      value: '',
      label: 'Please select...'
    }];

    let images = this.props.images.reduce(function(aliases, image) {
      return aliases.concat(image.aliases.map(function(alias) {
        return {
          value: alias.target,
          label: alias.target + ' - ' + image.properties.description
        };
      }));
    }, []);

    return defaultOptions.concat(images);
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
            images={this.getImageOptions()}
            profiles={this.props.profiles}
            showErrors={this.state.hasError}
            onImageSelectChange={this.onImageSelectChange}
          />
        </Form>
      </div>
    );
  }
}
