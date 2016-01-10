'use strict';

import React, { PropTypes } from 'react';

import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import RemoteImagesStore from '../../stores/RemoteImagesStore';
import ServersStore from '../../stores/ServersStore';
import Field from '../Field/Field';
import Select from '../Select/Select';

import { REMOTE_IMAGES__GET_END } from '../../constants/AppConstants';

export default class ImagesImportFieldset extends React.Component {

  state = {
    isLoading: false,
    remoteImages: RemoteImagesStore.getAll(),
    servers: ServersStore.getAll()
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
    let remoteImages = RemoteImagesStore.getAll();
    this.setState({ remoteImages });
  };

  onServersStoreChange = () => {
    let servers = ServersStore.getAll();
    this.setState({ servers });
  };

  onRemoteImagesGetEnd = (e) => {
    this.setState({
      isLoading: false
    });
  };

  onServerChange = (e) => {
    let name = e.target.value;
    let server = this.state.servers.filter((server) => {
      return server.name === name;
    })[0];

    console.log(server);
    // debugger;

    var formModel = this.context.formModel;
    formModel.set({
      'localAlias': null,
      'description': null,
      'serverUrl': server.url
    });

    this.setState({
      isLoading: true
    });
    AppActions.async([
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
    let renderImageFields = () => {
      return (
        <div className="images-import-fieldset__image-fields">
          <Field
            className="form-group"
            disabled={this.props.disabled}
            horizontal={true}
            Input={Select}
            options={this.state.remoteImages}
            name="remoteAlias"
            label="Remote Image"
            labelLayoutClassName="col-sm-2"
            inputLayoutClassName="col-sm-5"
            showError={this.props.showErrors}
            onChange={this.onImageChange}
          />
          <Field
            className="form-group"
            disabled={this.props.disabled}
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
            disabled={this.props.disabled}
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
      );
    };

    let renderLoadingMessage = () => {
      return (
        <div>
          Loading...
        </div>
      );
    };

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
        { this.state.isLoading ? renderLoadingMessage() : '' }
        { this.context.formModel.server && !this.state.isLoading ? renderImageFields() : '' }
      </fieldset>
    );
  }
}
