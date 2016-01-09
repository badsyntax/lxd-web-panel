'use strict';

import './ImagesImport.scss';
import React from 'react';
import RemoteImagesStore from '../../../stores/RemoteImagesStore';
import AppActions from '../../../actions/AppActions';
import AppDispatcher from '../../../dispatcher/AppDispatcher';

import ImagesImportForm from '../../../components/ImagesImportForm/ImagesImportForm';

import {
  IMAGES__GET_END
} from '../../../constants/AppConstants';

export default class ImagesImport extends React.Component {

  constructor(...props) {
    super(...props);

    this.dispatchToken = AppDispatcher.register(this.onAction);

    this.state = {
      remoteImages: RemoteImagesStore.getAll(),
      hasLoaded: false
    };
  }

  componentDidMount() {
    try {
      RemoteImagesStore.addChangeListener(this.onRemoteImagesStoreChange);
      AppActions.async([
        function getRemoteImages() {
          AppActions.getRemoteImages('images');
        }
      ]);
    } catch(e) {
      alert(e);
    }
  }

  componentWillUnmount() {
    RemoteImagesStore.removeChangeListener(this.onRemoteImagesStoreChange);
    AppDispatcher.unregister(this.dispatchToken);
  }

  onAction = (action) => {
    switch(action.actionType) {
      case IMAGES__GET_END:
        this.setState({
          hasLoaded: true
        });
        break;
      default:
    }
  };

  onRemoteImagesStoreChange = () => {
    var remoteImages = RemoteImagesStore.getAll();
    this.setState({ remoteImages });
  };

  render() {
    return (
      <div className={'images-import'}>
        <h2 className="sub-header">
          Import image
        </h2>
        <ImagesImportForm
            remoteImages={this.state.remoteImages}
            className={'form form-horizontal'} />
      </div>
    );
  }
}
