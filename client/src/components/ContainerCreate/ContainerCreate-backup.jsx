import './ContainerCreate.scss';
import React from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ProfilesStore from '../../stores/ProfilesStore';
import ImagesStore from '../../stores/ImagesStore';
import AppActions from '../../actions/AppActions';

import {
  ContainerModel,
  ImageModel
} from '../../models';

/*
Example create model:
{
  name: container,
  profiles: ['default'],
  source: {
    type: 'image',
    alias: 'ubuntu'
  }
}
 */


function getInitialState() {
  return {
    profiles: ProfilesStore.getAll(),
    images: ImagesStore.getAll(),
    container: new ContainerModel({
      profiles: ['default'],
      image: new ImageModel({
        name: null,
        alias: null
      })
    })
  };
}

export default class ContainerCreate extends React.Component {

  state = getInitialState()

  componentDidMount() {

    ProfilesStore.addChangeListener(this.onStoreChange);
    ImagesStore.addChangeListener(this.onStoreChange);

    AppActions.getProfiles();
    AppActions.getImages();
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onStoreChange);
    ImagesStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    this.setState({
      profiles: ProfilesStore.getAll(),
      images: ImagesStore.getAll()
    });
  }

  onFormChange = () => {
    var container = this.state.container;
    container.name = this.refs.name.value;
    this.setState({
      container: container
    });
  }

  onProfileCheckboxChange = (e) => {
    e.stopPropagation();

    var container = this.state.container;
    var profileIndex = parseInt(e.target.dataset.index, 10);
    var profile = this.state.profiles[profileIndex];
    var checked = e.target.checked;

    if (checked) {
      container.profiles.push(profile.name);
    } else {
      var containerProfileIndex = container.profiles.indexOf(profile.name);
      container.profiles.splice(containerProfileIndex, 1);
    }

    this.setState({
      container: container
    });
  }

  render() {
    let hasProfile = (profile) => {
      return (
        this.state.container.profiles.indexOf(profile.name) >= 0
      );
    }
    let hasImage = (image) => {
      return (
        this.state.container.image.alias === image.alias
      );
    }
    return (
      <div className={'container-creae'}>
        <h1>
          Create container
        </h1>
        <form
          className={'form-horizontal'}
          onChange={this.onFormChange}
          ref={'form'}
        >
          <div className="form-group">
            <label
              className="col-sm-2 control-label"
              htmlFor="inputName"
            >
              Name
            </label>
            <div className="col-sm-5">
              <input
                className="form-control"
                defaultValue={this.state.container.name}
                id="inputName"
                placeholder="name"
                ref={'name'}
                type="text"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label"
              htmlFor="inputImage"
            >
              Image
            </label>
            <div className="col-sm-5">
              <select
                className="form-control"
                defaultValue={this.state.container.image.alias}
                id="inputImage"
                placeholder="Default image"
                ref={'name'}
              >
                <option>Please select...</option>
                { this.state.images.map((image, i) => {
                  return (
                    <option
                      key={'image-' + i}
                      selected={hasImage(image)}
                      value={image.alias}
                    >
                      {image.alias}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label"
              htmlFor="input"
            >
              Profiles
            </label>
            <div className="col-sm-5">
              <ul className="container-create__profiles">
                {
                  this.state.profiles.map((profile, i) => {
                    var className = classNames({
                      'checkbox': true,
                      '-checked': hasProfile(profile)
                    });
                    return (
                      <li
                        className={className}
                        key={'profile-' + i}
                      >
                        <label>
                          <input
                            checked={hasProfile(profile)}
                            data-index={i}
                            onChange={this.onProfileCheckboxChange}
                            type="checkbox"
                          />
                          { profile.name }
                        </label>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
