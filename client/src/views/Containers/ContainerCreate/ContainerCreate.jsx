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

  static foo = 'bar';

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
  }

  onProfilesStoreChange = () => {
    var profiles = ProfilesStore.getAll();
    this.setState({ profiles });
  }

  onImagesStoreChange = () => {
    var images = ImagesStore.getAll();
    this.setState({ images });
  }

  render() {
    return (
      <div className={'container-creae'}>
        <h2 className="sub-header">
          Create container
        </h2>
        { true || this.state.hasLoaded && this.state.images.length ? (
          <ContainerCreateForm
            className={'form-horizontal'}
            images={this.state.images}
            profiles={this.state.profiles}
          />
          ) : (
          <Alert
            icon="info-sign"
            message="You need to create a base image before you can create a container."
            type="danger"
          />
        ) }
      </div>
    );
  }
}
