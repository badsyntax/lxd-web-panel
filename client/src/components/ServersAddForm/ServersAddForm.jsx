'use strict';

import './ServersAddForm.scss';
import React, { PropTypes } from 'react';
import ServersAddFieldset from './ServersAddFieldset';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppActions from '../../actions/AppActions';
import { DEFAULT_SERVER_URL } from '../../constants/AppConstants';

import ServerAddModel from '../../models/ServerAddModel';

import Alert from '../Alert/Alert';
import Form from '../Form/Form';

import {
  SERVER_ADD__SUCCESS,
  SERVER_ADD__ERROR,
  SERVER_ADD__START,
  SERVER_ADD__END
} from '../../constants/AppConstants';

export default class ServersAddForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
  };

  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  constructor(...props) {
    super(...props);

    this.dispatchToken = AppDispatcher.register(this.onAction);
  }

  componentWillMount() {

    var initialData = {
      name: 'images',
      url: DEFAULT_SERVER_URL
    };

    var formModel = new ServerAddModel(initialData, this.onFormModelChange);

    this.setState({ formModel });
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  onAction = (action) => {
    switch(action.actionType) {
      case SERVER_ADD__ERROR:
        this.setState({
          hasError: true
        });
        break;
      case SERVER_ADD__SUCCESS:
        this.context.history.pushState(null, '/servers');
        break;
      case SERVER_ADD__START:
        this.setState({
          hasError: false,
          isFormLoading: true
        });
        break;
      case SERVER_ADD__END:
        this.setState({
          isFormLoading: false
        });
        break;
      default:
    }
  };

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
      AppActions.addServer(formModel);
    }
  };

  render() {
    try {
      return (
        <div className="images-import-form">
          { this.state.hasError ? (
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
            <ServersAddFieldset
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
