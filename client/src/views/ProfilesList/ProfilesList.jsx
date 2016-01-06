import './ProfilesList.scss';
import React from 'react';
import ProfilesStore from '../../stores/ProfilesStore';
import AppActions from '../../actions/AppActions';
import Alert from '../../components/Alert/Alert';

function getState() {
  return {
    profiles: ProfilesStore.getAll()
  };
}

export default class Profiles extends React.Component {

  constructor(...props) {
    super(...props);
    this.state = getState();
  }

  componentDidMount() {
    ProfilesStore.addChangeListener(this.onChange);
    AppActions.getProfiles();
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    var state = getState();
    this.setState(state);
  }

  render() {
    let { profiles } = this.state;
    return (
      <div className={'profiles-list'}>
        { profiles.length ? getTable(profiles) : getAlert() }
      </div>
    );

    function getTable(profiles) {
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
              profiles.map((profile, index) => {
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
      return <Alert heading="No profiles" type="warning" />;
    }
  }
}
