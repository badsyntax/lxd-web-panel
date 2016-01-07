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
      this.actionHandler = AppDispatcher.register(this.onAction);
      ServersStore.addChangeListener(this.onServersStoreChange);
      this.loadServers();
    } catch(e) {
      alert(e);
    }
  }

  componentWillUnmount() {
    ServersStore.removeChangeListener(this.onServersStoreChange);
    AppDispatcher.unregister(this.actionHandler);
  }

  loadServers() {
    AppActions.async([AppActions.getServers]);
  }

  onAction = (action) => {
    switch(action.actionType) {
      case SERVER_DELETE__ERROR:
        this.setState({
          hasError: true
        });
        alert('Error deleting the image');
        break;
      case SERVER_DELETE__SUCCESS:
        this.loadServers();
        break;
      case SERVER_DELETE__START:
        this.setState({
          hasError: false,
          isImageDeleting: true
        });
        break;
      case SERVER_DELETE__END:
        this.setState({
          isImageDeleting: false
        });
        break;
      default:
    }
  };

  onServersStoreChange = () => {
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
                  <th>Alias</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                servers.map((server, index) => {
                  return (
                    <tr key={'server-' + index}>
                      <td>{ server.getAlias() }</td>
                      <td>{ server.properties.description }</td>
                      <td>{ server.sizeFriendly }</td>
                      <td>{ server.createdAtFriendly }</td>
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
