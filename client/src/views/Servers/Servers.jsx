import './Servers.scss';
import React from 'react';

export default class Servers extends React.Component {
  render() {
    return (
      <div className={'servers'}>
        {this.props.children}
      </div>
    );
  }
}
