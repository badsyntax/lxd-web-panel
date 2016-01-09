'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
        <div className="navbar-header">
          <Link className={'navbar-brand'} to={'overview'}>LXD Web Panel</Link>
        </div>
          <div
            className="navbar-collapse collapse"
            id="navbar"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={'signout'}>
                  Sign Out
                  &nbsp;<span className="glyphicon glyphicon-log-out"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
