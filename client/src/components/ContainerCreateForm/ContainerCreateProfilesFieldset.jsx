import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class ContainerCreateProfilesFieldset extends React.Component {

  static propTypes = {
    profiles: PropTypes.array.isRequired,
    showErrors: PropTypes.bool
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  }

  hasProfile(profile) {
    return (
      this.context.formModel.profiles.indexOf(profile) >= 0
    );
  }

  onChange = () => {

  }

  render() {

    let getProfile = (profile, i) => {
      var className = classNames({
        'checkbox': true,
        '-checked': this.hasProfile(profile)
      });
      return (
        <li
          className={className}
          key={'profile-' + i}
        >
          <label>
            <input
              checked={this.hasProfile(profile)}
              data-index={i}
              type="checkbox"
              onChange={this.onChange}
            />
            { profile.name }
          </label>
        </li>
      );
    };

    return(
      <fieldset className="form-group">
        <legend
          className="col-sm-2 control-label"
        >
          Profiles
        </legend>
        <div className="col-sm-5">
          <ul className="container-create__profiles">
            { this.props.profiles.map(getProfile) }
          </ul>
        </div>
      </fieldset>
    );
  }
}
