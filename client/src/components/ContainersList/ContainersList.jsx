'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';

export default class ContainersList extends React.Component {

  state = {
    containers: []
  }

  componentDidMount() {
    WebAPI.getContainers()
    .then(function(response) {
      if (response.containers) {
        this.setState({
          containers: response.containers
        });
      }
    }.bind(this));
  }
  render() {

    function getIPV4Address(container, protocol, intface) {
      var ip = container.data.status.ips.filter((ip) => {
        return ip.protocol === protocol && ip.interface === intface;
      })[0];
      return ip && ip.address && ip.address + ' (' + intface + ')';
    }

    function getProfiles(container) {
      return container.data.profiles.map(function(profile) {
        return (
          <Link key={'profile-'+profile} to={'profile'}>{profile}</Link>
        );
      })
    }
    return (
      <div className={'containers'}>
        <h1>
          Containers
          <Link to={'containers/create'} className={'btn btn-default btn-new-container'}>
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
                return (
                  <tr key={'row-' + container.name}>
                    <td>{ container.name }</td>
                    <td>{ container.data.status.status.toUpperCase() }</td>
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
