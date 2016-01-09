'use strict';

import './ServersList.scss';
import React from 'react';
import { Link } from 'react-router';
import ServersStore from '../../../stores/ServersStore';
import AppActions from '../../../actions/AppActions';
import AppDispatcher from '../../../dispatcher/AppDispatcher';
import Alert from '../../../components/Alert/Alert';

import {
  SERVER_DELETE__START,
  SERVER_DELETE__END,
  SERVER_DELETE__SUCCESS,
  SERVER_DELETE__ERROR
} from '../../../constants/AppConstants';

function getState() {
  return {
    servers: ServersStore.getAll()
  };
}

export default class Servers extends React.Component {

  state = getState();

  componentDidMount() {
    try {
      ServersStore.addChangeListener(this.onServersStoreChange);
      this.loadServers();
    } catch(e) {
      alert(e);
    }
  }

  componentWillUnmount() {
    ServersStore.removeChangeListener(this.onServersStoreChange);
  }

  loadServers() {
    AppActions.async([AppActions.getServers]);
  }

  onServersStoreChange = () => {
    console.log('server store change');
    this.setState(getState());
  };

  onDeleteButtonClick = (server) => {
    server.delete();
  };

  render() {
    try {
      let { servers } = this.state;
      return (
        <div className={'remote-servers-list'}>
          <h2 className="sub-header">
            Remote Servers
            <Link
              className={'btn btn-primary btn-new-container'}
              to={'servers/add'}
            >
              Add server
            </Link>
          </h2>
          { servers.length ? getTable(servers) : getAlert() }
        </div>
      );

      function getTable(servers) {
        return (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Public</th>
                </tr>
              </thead>
              <tbody>
              {
                servers.map((server, index) => {
                  return (
                    <tr key={'server-' + index}>
                      <td>{ server.name }</td>
                      <td>{ server.url }</td>
                      <td>{ server.public ? 'Yes' : 'No' }</td>
                      <td>
                        <button className="btn btn-default btn-xs">Edit</button>
                        <button className="btn btn-default btn-xs" onClick={this.onDeleteButtonClick.bind(this, server)}>Delete</button>
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
        return (
          <Alert
            heading="No remote servers"
            type="warning"
            icon="info-sign"
          />
        );
      }
    } catch(e) { alert(e); }
  }
}
