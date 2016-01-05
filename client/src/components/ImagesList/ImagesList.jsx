import './ImagesList.scss';
import React from 'react';
import { Link } from 'react-router';
import ImagesStore from '../../stores/ImagesStore';
import AppActions from '../../actions/AppActions';
import Alert from '../Alert/Alert';

function getState() {
  return {
    images: ImagesStore.getAll()
  };
}

export default class Images extends React.Component {

  state = getState()

  componentDidMount() {
    try {
      ImagesStore.addChangeListener(this.onImageStoreChange);
      AppActions.async([AppActions.getImages]);
    } catch(e) {
      alert(e);
    }
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this.onImageStoreChange);
  }

  onImageStoreChange = () => {
    this.setState(getState());
  }

  onDeleteButtonClick = (image, e) => {
    debugger;
  }

  render() {
    try {
      let { images } = this.state;
      console.log('images', images, images.length);
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
          { images.length ? getTable(images) : getAlert() }
        </div>
      );

      function getTable(images) {
        return (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Alias</th>
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
                      <td>{ image.getAlias() }</td>
                      <td>{ image.properties.description }</td>
                      <td>{ image.sizeFriendly() }</td>
                      <td>{ image.createdAtFriendly() }</td>
                      <td>
                        <button className="btn btn-default btn-xs">Edit</button>
                        <button className="btn btn-default btn-xs" onClick={this.onDeleteButtonClick.bind(this, image)}>Delete</button>
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

      function getAlert() {
        return (
          <Alert
            heading="No images"
            type="warning"
            icon="info-sign"
          />
        );
      }
    } catch(e) { alert(e); }
  }
}
