import './ContainersList.scss';
import React from 'react';
import { Link } from 'react-router';
import ContainersStore from '../../stores/ContainersStore';
import AppActions from '../../actions/AppActions';
import Alert from '../Alert/Alert';

function getState() {
  return {
    containers: ContainersStore.getAll()
  };
}

export default class ContainersList extends React.Component {

  state = getState()

  componentDidMount() {
    ContainersStore.addChangeListener(this.onStoreChange);
    AppActions.getContainers();
  }

  componentWillUnmount() {
    ContainersStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    this.setState(getState());
  }

  render() {
    let { containers } = this.state;
    return (
      <div className={'containers-list'}>
        <h1>
          Containers
          <Link
            className={'btn btn-primary btn-new-container'}
            to={'containers/create'}
          >
            New container
          </Link>
        </h1>
        { containers.length ? getTable(containers) : getAlert() }
      </div>
    );

    function getProfiles(container) {
      return container.profiles.map(function(profile) {
        return (
          <Link key={'profile-'+profile} to={'profile'}>{profile}</Link>
        );
      })
    }

    function getContainerRow(container) {
      console.log(container);
      return (
        <tr key={'row-' + container.name}>
          <td>{ container.name }</td>
          <td>{ container.status.status.toUpperCase() }</td>
          <td>{ container.getAddress('IPV4', 'eth0') }</td>
          <td>{ container.getAddress('IPV6', 'eth0') }</td>
          <td>{ getProfiles(container) }</td>
          <td>
            <button className="btn btn-default btn-xs">Edit</button>
            <button className="btn btn-default btn-xs">Delete</button>
            <button className="btn btn-default btn-xs">Stop</button>
            <button className="btn btn-default btn-xs">Start</button>
          </td>
        </tr>
      );
    }

    function getTable(containers) {
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>IPV4</th>
                <th>IPV6</th>
                <th>Profiles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              containers.map(getContainerRow)
            }
            </tbody>
          </table>
        </div>
      );
    }

    function getAlert() {
      return (<Alert heading="No containers" type="warning" />);
    }
  }
}
