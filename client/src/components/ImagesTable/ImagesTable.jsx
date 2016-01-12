'use strict';

import './ImagesTable.scss';
import React from 'react';
import ImagesStore from '../../stores/ImagesStore';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppActions from '../../actions/AppActions';
import ImagesTableTable from './ImagesTableTable';
import ImagesTableError from './ImagesTableError';

import {
  IMAGE_DELETE__START,
  IMAGE_DELETE__END,
  IMAGE_DELETE__SUCCESS,
  IMAGE_DELETE__ERROR
} from '../../constants/AppConstants';

function getState() {
  return {
    images: ImagesStore.getAll()
  };
}

export default class ImagesTable extends React.Component {

  state = getState();

  componentDidMount() {
    this.actionHandlers = {
      [IMAGE_DELETE__END]:     this.onImageDeleteEnd,
      [IMAGE_DELETE__ERROR]:   this.onImageDeleteError,
      [IMAGE_DELETE__START]:   this.onImageDeleteStart,
      [IMAGE_DELETE__SUCCESS]: this.onImageDeleteSuccess,
    };

    AppDispatcher.on(this.actionHandlers);
    ImagesStore.addChangeListener(this.onImageStoreChange);
    AppActions.async([AppActions.getImages]);
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this.onImageStoreChange);
    AppDispatcher.off(this.actionHandlers);
  };

  onImageDeleteError = () => {
    this.setState({
      hasError: true
    });
    alert('Error deleting the image');
  };

  onImageDeleteSuccess = () => {
    AppActions.async([AppActions.getImages]);
  };

  onImageDeleteStart = () => {
    this.setState({
      hasError: false,
      isImageDeleting: true
    });
  };

  onImageDeleteEnd = () => {
    this.setState({
      isImageDeleting: false
    });
  };

  onImageStoreChange = () => {
    this.setState(getState());
  };

  render() {
    let { images } = this.state;
    return (
      <div className={'images-table'}>
        { images.length ? <ImagesTableTable images={images} /> : <ImagesTableError /> }
      </div>
    );
  }
}
