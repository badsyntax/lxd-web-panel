'use strict';

import './Users.scss';
import React from 'react';

export default class Users extends React.Component {
  render() {
    return (
      <div className={'users'}>
        <h2 className="sub-header">Users</h2>
        {this.props.children}
      </div>
    );
  }
}
