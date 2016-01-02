import './ImagesImport.scss';
import React from 'react';
import ProfilesStore from '../../stores/ProfilesStore';
import RemoteImagesStore from '../../stores/RemoteImagesStore';
import AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

import Alert from '../Alert/Alert';
// import ImagesImportForm from '../ImagesImportForm/ImagesImportForm';

import {
  IMAGES__GET_END
} from '../../constants/AppConstants';

export default class ImagesImport extends React.Component {

  constructor(...props) {
    super(...props);

    this.dispatchToken = AppDispatcher.register(this.onAction);

    this.state = {
      images: RemoteImagesStore.getAll(),
      hasLoaded: false
    };
  }

  componentDidMount() {

    try {

      RemoteImagesStore.addChangeListener(this.onRemoteImagesStoreChange);

      AppActions.async([
        AppActions.getRemoteImages
      ]);
    } catch(e) {
      alert(e);
    }
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onRemoteImagesStoreChange);
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
  }

  onRemoteImagesStoreChange = () => {
    var remoteImages = RemoteImagesStore.getAll();
    console.log('REMOTE IMAGES', remoteImages);
    this.setState({ remoteImages });
  }

  render() {
    return (
      <div className={'container-creae'}>
        <h1>
          Import image
        </h1>
      </div>
    );
  }
}
