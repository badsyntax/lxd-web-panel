import './ImagesList.scss';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ImagesStore from '../../stores/ImagesStore';
import AppActions from '../../actions/AppActions';

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
        </h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.images.map((image, index) => {
                return (
                  <tr key={'image-' + index}>
                    <td>{ image.name }</td>
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
      </div>
    );
  }
}
