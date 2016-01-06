import './RemoteServers.scss';
import React from 'react';

export default class RemoteServers extends React.Component {
  render() {
    return (
      <div className={'remote-servers'}>
        <h2 className="sub-header">Remote Servers</h2>
        {this.props.children}
      </div>
    );
  }
}
