'use strict';

import './UserInterface.scss';
import React from 'react';

export default class UserInterface extends React.Component {
  render() {
    return (
      <div className={'user-interface'}>
        <h2 className="sub-header">User Interface</h2>
        {this.props.children}
      </div>
    );
  }
}
