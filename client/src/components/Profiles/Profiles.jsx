'use strict';

import './Profiles.scss';
import React from 'react';

export default class Profiles extends React.Component {
  render() {
    return (
      <div className={'profiles'}>
        {this.props.children}
      </div>
    );
  }
}
