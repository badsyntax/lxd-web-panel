import './ImagesImportForm.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ImagesImportFieldset from './ImagesImportFieldset';

import ImageImportModel from '../../models/ImageImport';

import Alert from '../Alert/Alert';
import Form from '../Form/Form';

export default class ImagesImportForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func,
    remoteImages: PropTypes.array.isRequired,
  };

  constructor(...props) {
    super(...props);

    var initialData = {
      public: false,
      localAlias: null,
      remoteAlias: null,
      server: 'https://images.linuxcontainers.org'
    };

    var formModel = new ImageImportModel(initialData, null, this.onFormModelChange);

    this.state = {
      formModel
    };
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
  }

  render() {
    return (
      <div className="images-import-form">
        { this.state.showError ? (
          <Alert
            message="There was an error submitting the form. Please correct the errors below."
            type="danger"
            icon="info-sign"
          />
        ) : '' }
        <Form
          className={'form-horizontal'}
          formModel={this.state.formModel}
          onSubmit={this.onSubmit}
        >
          <ImagesImportFieldset
            remoteImages={this.props.remoteImages}
            disabled={this.props.disabled}
            showErrors={this.state.showError}
          />
        </Form>
      </div>
    )
  }
}
