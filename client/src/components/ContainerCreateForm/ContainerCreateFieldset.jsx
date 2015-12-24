import React, { PropTypes } from 'react';

export default class ContainerCreateFieldset extends React.Component {

  static propTypes = {
    images: PropTypes.array,
    profiles: PropTypes.array
  };

  render() {

    let hasProfile = (profile) => {
      return false;
      return (
        this.state.container.profiles.indexOf(profile.name) >= 0
      );
    }
    let hasImage = (image) => {
      return false;
      return (
        this.state.container.image.alias === image.alias
      );
    }
    return (
      <fieldset>
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
              id="inputImage"
              placeholder="Default image"
              ref={'name'}
            >
              <option>Please select...</option>
              { this.props.images.map((image, i) => {
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
                this.props.profiles.map((profile, i) => {
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
      </fieldset>
    );
  }
}
