import './ProfilesList.scss';
import React from 'react';
import { Link } from 'react-router';
import ProfilesStore from '../../stores/ProfilesStore';
import AppActions from '../../actions/AppActions';
import Alert from '../Alert/Alert';

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
    console.log(this.state);
  }

  render() {

    return (
      <div className={'profiles'}>
        <h1>
          Profiles
          <Link className={'btn btn-primary btn-new-profile'} to={'profiles/create'}>
            New profile
          </Link>
        </h1>
        { this.state.profiles.length ? getTable() : getAlert() }
      </div>
    );

    function getTable() {
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Devices</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.profiles.map((profile, index) => {
                return (
                  <tr key={'profile-' + index}>
                    <td>{ profile.name }</td>
                    <td>{ profile.getFriendlyDevices() }</td>
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
      return <Alert heading="No profiles" type="warning" />
    }
  }
}
