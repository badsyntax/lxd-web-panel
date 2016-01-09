'use strict';

import './Profiles.scss';
import React from 'react';
import { Link } from 'react-router';

export default class Profiles extends React.Component {
  render() {
    return (
      <div className={'profiles'}>
        <h2 className="sub-header">
          Profiles
          <Link className={'btn btn-primary btn-new-profile'} to={'profiles/create'}>
            New profile
          </Link>
        </h2>
        {this.props.children}
      </div>
    );
  }
}
