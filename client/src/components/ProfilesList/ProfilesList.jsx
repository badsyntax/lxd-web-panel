import './ProfilesList.scss';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ProfilesStore from '../../stores/ProfilesStore';
import AppActions from '../../actions/AppActions';

function getState() {
  return {
    profiles: ProfilesStore.getAll()
  };
}

export default class Profiles extends React.Component {

  state = getState()

  componentDidMount() {
    ProfilesStore.addChangeListener(this.onChange);
    AppActions.getProfiles();
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getState());
  }

  render() {
    return (
      <div className={'profiles'}>
        <h1>
          Profiles
          <Link className={'btn btn-default btn-new-profile'} to={'profiles/create'}>
            New profile
          </Link>
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
              this.state.profiles.map((profile, index) => {
                return (
                  <tr key={'profile-' + index}>
                    <td>{ profile.name }</td>
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
