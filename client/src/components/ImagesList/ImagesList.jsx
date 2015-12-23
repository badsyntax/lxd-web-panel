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
    ImagesStore.addChangeListener(this.onChange);
    AppActions.getImages();
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getState());
  }

  render() {
    return (
      <div className={'images-list'}>
        <h1>
          Images
          <Link
            className={'btn btn-primary btn-new-container'}
            to={'images/import'}
          >
            Import image
          </Link>
        </h1>
        { this.state.images.length ? getTable() : getAlert() }
      </div>
    );

    function getTable() {
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Alias</th>
                <th>OS</th>
                <th>Size</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.images.map((image, index) => {
                return (
                  <tr key={'image-' + index}>
                    <td>{ image.getAlias() }</td>
                    <td>{ image.properties.os } ({ image.properties.release })</td>
                    <td>{ image.sizeFriendly() }</td>
                    <td>{ image.createdAtFriendly() }</td>
                    <td>
                      <button className="btn btn-default btn-xs">Edit</button>
                      <button className="btn btn-default btn-xs">Delete</button>
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
      return (<Alert heading="No images" type="warning" />);
    }
  }
}
