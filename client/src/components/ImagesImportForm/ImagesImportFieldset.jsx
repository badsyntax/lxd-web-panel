'use strict';

import React, { PropTypes } from 'react';

import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import RemoteImagesStore from '../../stores/RemoteImagesStore';
import ServersStore from '../../stores/ServersStore';
import Field from '../Field/Field';
import Select from '../Select/Select';

import { REMOTE_IMAGES__GET_END } from '../../constants/AppConstants';

function getRemoteImages() {
  var remoteImages = RemoteImagesStore.getAll();
  return remoteImages.length ? [
    {
      label: 'Please select...',
      value: null
    }
  ].concat(remoteImages) : [];
}

function getServers() {
  return [
    {
      label: 'Please select...',
      value: null
    }
  ].concat(ServersStore.getAll());
}

export default class ImagesImportFieldset extends React.Component {

  state = {
    isLoading: false,
    remoteImages: getRemoteImages(),
    servers: getServers()
  };

  static propTypes = {
    showErrors: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  constructor(...props) {
    super(...props);
  }

  componentDidMount() {
    RemoteImagesStore.addChangeListener(this.onRemoteImagesStoreChange);
    ServersStore.addChangeListener(this.onServersStoreChange);
    AppActions.async([
      AppActions.getServers
    ]);
    AppDispatcher.on(REMOTE_IMAGES__GET_END, this.onRemoteImagesGetEnd);
  }

  componentWillUnmount() {
    RemoteImagesStore.removeChangeListener(this.onRemoteImagesStoreChange);
    ServersStore.removeChangeListener(this.onServersStoreChange);
    AppDispatcher.off(REMOTE_IMAGES__GET_END, this.onRemoteImagesGetEnd);
  }

  onRemoteImagesStoreChange = () => {
    let remoteImages = getRemoteImages();
    this.setState({ remoteImages });
  };

  onServersStoreChange = () => {
    let servers = getServers();
    this.setState({ servers });
  };

  onRemoteImagesGetEnd = (e) => {
    this.setState({
      isLoading: false
    });
    AppActions.async([
      AppActions.modalHide
    ]);
  };

  onServerChange = (e) => {
    let name = e.target.value;
    let server = this.state.servers.filter((server) => {
      return server.name === name;
    })[0];

    var formModel = this.context.formModel;
    formModel.set({
      'localAlias': null,
      'description': null,
      'serverUrl': server ? server.url : null
    });

    if (!server) { return; }

    this.setState({
      isLoading: true
    });
    AppActions.async([
      AppActions.modalShow.bind(null, {
        message: 'Loading...',
        className: '-loading',
        options: {
          close: false
        }
      }),
      AppActions.getRemoteImages.bind(null, name)
    ]);
  };

  onImageChange = (e) => {
    var alias = e.target.value;
    var description = e.target.options[e.target.selectedIndex].innerHTML.trim();
    var formModel = this.context.formModel;
    formModel.set('localAlias', alias);
    formModel.set('description', description);
    this.setState({
      formModel: formModel
    });
  };

  render() {
    let hasServer = Boolean(this.context.formModel.server);
    let areImageFieldsDisabled = (this.props.disabled || !hasServer || this.state.isLoading);
    let remoteImages = this.state.remoteImages;
    return (
      <fieldset className="images-import-fieldset">
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          Input={Select}
          options={this.state.servers}
          name="server"
          label="Remote server"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          showError={this.props.showErrors}
          onChange={this.onServerChange}
        />
        <div className="images-import-fieldset__image-fields">
          <Field
            className="form-group"
            disabled={areImageFieldsDisabled}
            horizontal={true}
            Input={Select}
            defaultValue={remoteImages.length ? remoteImages[0].value : null}
            options={remoteImages}
            name="remoteAlias"
            label="Remote Image"
            labelLayoutClassName="col-sm-2"
            inputLayoutClassName="col-sm-5"
            showError={this.props.showErrors}
            onChange={this.onImageChange}
          />
          <Field
            className="form-group"
            disabled={areImageFieldsDisabled}
            horizontal={true}
            name="localAlias"
            label="Local alias"
            labelLayoutClassName="col-sm-2"
            inputLayoutClassName="col-sm-5"
            placeholder="Name"
            showError={this.props.showErrors}
          />
          <Field
            className="form-group"
            disabled={areImageFieldsDisabled}
            horizontal={true}
            name="description"
            label="Description"
            labelLayoutClassName="col-sm-2"
            inputLayoutClassName="col-sm-5"
            placeholder="Description"
            showError={this.props.showErrors}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-2">
              <button type="submit" className="btn btn-med btn-primary btn-block">Submit</button>
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
}
