import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ContainersStore from '../../stores/ContainersStore';
import AppActions from '../../actions/AppActions';

function getState() {
  return {
    containers: ContainersStore.getAll()
  };
}

export default class ContainersList extends React.Component {

  state = getState()

  componentDidMount() {
    ContainersStore.addChangeListener(this.onChange);
    AppActions.getContainers();
  }

  componentWillUnmount() {
    ContainersStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getState());
    console.log(this.state.containers);
  }

  render() {

    function getIPV4Address(container, protocol, intface) {
      var ip = container.status.ips.filter((ip) => {
        return ip.protocol === protocol && ip.interface === intface;
      })[0];
      return ip && ip.address && ip.address + ' (' + intface + ')';
    }

    function getProfiles(container) {
      return container.profiles.map(function(profile) {
        return (
          <Link key={'profile-'+profile} to={'profile'}>{profile}</Link>
        );
      })
    }
    return (
      <div className={'containers'}>
        <h1>
          Containers
          <Link
            className={'btn btn-default btn-new-container'}
            to={'containers/create'}
          >
            New container
          </Link>
        </h1>
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
              this.state.containers.map((container) => {
                console.log(container);
                return (
                  <tr key={'row-' + container.name}>
                    <td>{ container.name }</td>
                    <td>{ container.status.status.toUpperCase() }</td>
                    <td>{ getIPV4Address(container, 'IPV4', 'eth0') }</td>
                    <td>{ getIPV4Address(container, 'IPV6', 'eth0') }</td>
                    <td>{ getProfiles(container) }</td>
                    <td>
                      <button className="btn btn-default btn-xs">Edit</button>
                      <button className="btn btn-default btn-xs">Delete</button>
                      <button className="btn btn-default btn-xs">Stop</button>
                      <button className="btn btn-default btn-xs">Start</button>
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
