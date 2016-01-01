import './Config.scss';
import React from 'react';

export default class Config extends React.Component {
  render() {
    return (
      <div className={'config'}>
        {this.props.children}
      </div>
    );
  }
}
