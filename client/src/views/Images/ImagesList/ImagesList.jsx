'use strict';

import './ImagesList.scss';
import React from 'react';
import { Link } from 'react-router';
import ImagesStore from '../../../stores/ImagesStore';
import AppActions from '../../../actions/AppActions';
import AppDispatcher from '../../../dispatcher/AppDispatcher';
import Alert from '../../../components/Alert/Alert';

import {
  IMAGE_DELETE__START,
  IMAGE_DELETE__END,
  IMAGE_DELETE__SUCCESS,
  IMAGE_DELETE__ERROR
} from '../../../constants/AppConstants';

function getState() {
  return {
    images: ImagesStore.getAll()
  };
}

export default class ImagesList extends React.Component {

  state = getState();

  componentDidMount() {
    this.actionHandlers = {
      IMAGE_DELETE__END:     this.onImageDeleteEnd,
      IMAGE_DELETE__ERROR:   this.onImageDeleteError,
      IMAGE_DELETE__START:   this.onImageDeleteStart,
      IMAGE_DELETE__SUCCESS: this.onImageDeleteSuccess,
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

  onDeleteButtonClick = (image) => {
    AppActions.async([function() {
      AppActions.confirm({
        message: 'Are you sure you want to delete this image?',
        onConfirmYes: () => {
          alert('confirm yes');
          // image.delete();
        },
        onConfirmNo: () => {
          alert('confirm no');
        }
      });
    }]);
  };

  renderTable(images) {
    console.log(images);
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Aliases</th>
              <th>Description</th>
              <th>Size</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            images.map((image, index) => {
              return (
                <tr key={'image-' + index}>
                  <td>{ image.friendlyAliases }</td>
                  <td>{ image.properties.description }</td>
                  <td>{ image.sizeFriendly }</td>
                  <td>{ image.createdAtFriendly }</td>
                  <td>
                    <button className="btn btn-default btn-xs">Edit</button>
                    <button
                      className="btn btn-default btn-xs"
                      onClick={this.onDeleteButtonClick.bind(this, image)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }

  renderAlert() {
    return (
      <Alert
        heading="No images"
        type="warning"
        icon="info-sign"
      />
    );
  }

  render() {
    let { images } = this.state;
    return (
      <div className={'images-list'}>
        <h2 className="sub-header">
          Images
          <Link
            className={'btn btn-primary btn-new-container'}
            to={'images/import'}
          >
            Import image
          </Link>
        </h2>
        { images.length ? this.renderTable(images) : this.renderAlert() }
      </div>
    );
  }
}
