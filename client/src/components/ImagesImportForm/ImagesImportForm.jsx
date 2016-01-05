import './ImagesImportForm.scss';
import React, { PropTypes } from 'react';
import ImagesImportFieldset from './ImagesImportFieldset';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppActions from '../../actions/AppActions';

import ImageImportModel from '../../models/ImageImport';

import Alert from '../Alert/Alert';
import Form from '../Form/Form';

import {
  IMAGE_IMPORT__SUCCESS,
  IMAGE_IMPORT__ERROR,
  IMAGE_IMPORT__START,
  IMAGE_IMPORT__END
} from '../../constants/AppConstants';

export default class ImagesImportForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func,
    remoteImages: PropTypes.array.isRequired,
  };

  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  constructor(...props) {
    super(...props);

    this.dispatchToken = AppDispatcher.register(this.onAction);

    var initialData = {
      public: false,
      localAlias: '',
      remoteAlias: '',
      description: '',
      server: 'https://images.linuxcontainers.org'
    };

    var formModel = new ImageImportModel(initialData, null, this.onFormModelChange);

    this.state = {
      formModel
    };
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  onAction = (action) => {
    switch(action.actionType) {
      case IMAGE_IMPORT__ERROR:
        this.setState({
          hasError: true
        });
        break;
      case IMAGE_IMPORT__SUCCESS:
        this.context.history.pushState(null, '/images');
        break;
      case IMAGE_IMPORT__START:
        this.setState({
          hasError: false,
          isFormLoading: true
        });
        break;
      case IMAGE_IMPORT__END:
        this.setState({
          isFormLoading: false
        });
        break;
      default:
    }
  }

  onFormModelChange = (formModel) => {
    this.setState({
      formModel: formModel
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let formModel = this.state.formModel;

    this.setState({
      hasError: !formModel.isValid()
    });

    if (formModel.isValid()) {
      AppActions.importImage(formModel);
    }
  }

  render() {
    try {
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
              showErrors={this.state.hasError}
            />
          </Form>
        </div>
      );
    } catch(e) {
      alert(e);
    }
  }
}
