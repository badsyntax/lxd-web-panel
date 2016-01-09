'use strict';

import React from 'react';

import AuthStore from '../../stores/AuthStore';

export default class SignOut extends React.Component {

  static contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
  };

  componentDidMount() {
    AuthStore.clearToken();
    this.context.history.pushState('overview');
  }

  render() {
    return (
      <div></div>
    );
  }
}
