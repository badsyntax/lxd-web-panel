'use strict';

import './Images.scss';
import React from 'react';

export default class Images extends React.Component {
  render() {
    return (
      <div className={'images'}>
        {this.props.children}
      </div>
    );
  }
}
