'use strict';

import './ContainerCreate.scss';
import React from 'react';
import ProfilesStore from '../../../stores/ProfilesStore';
import ImagesStore from '../../../stores/ImagesStore';
import AppActions from '../../../actions/AppActions';
import AppDispatcher from '../../../dispatcher/AppDispatcher';

import Alert from '../../../components/Alert/Alert';
import ContainerCreateForm from '../../../components/ContainerCreateForm/ContainerCreateForm';

import {
  IMAGES__GET_END
} from '../../../constants/AppConstants';

export default class ContainerCreate extends React.Component {

  constructor(...props) {
    super(...props);

    this.dispatchToken = AppDispatcher.register(this.onAction);

    this.state = {
      profiles: ProfilesStore.getAll(),
      images: ImagesStore.getAll(),
      hasLoaded: false
    };
  }

  componentDidMount() {

    ProfilesStore.addChangeListener(this.onProfilesStoreChange);
    ImagesStore.addChangeListener(this.onImagesStoreChange);

    AppActions.async([
      AppActions.getProfiles,
      AppActions.getImages
    ]);
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onProfilesStoreChange);
    ImagesStore.removeChangeListener(this.onImagesStoreChange);
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

  onProfilesStoreChange = () => {
    let profiles = ProfilesStore.getAll();
    this.setState({ profiles });
  };

  onImagesStoreChange = () => {
    this.setState({ images: ImagesStore.getAll() });
  };

  render() {

    let form = this.state.images.length ? <ContainerCreateForm
      className={'form-horizontal'}
      images={this.state.images}
      profiles={this.state.profiles}
    /> : null;

    let alert = this.state.hasLoaded && !this.state.images.length ? <Alert
      icon="info-sign"
      message="You need to create a base image before you can create a container."
      type="danger"
    /> : null;

    return (
      <div className={'container-creae'}>
        <h2 className="sub-header">
          Create container
        </h2>
        { form }
        { alert }
      </div>
    );
  }
}
