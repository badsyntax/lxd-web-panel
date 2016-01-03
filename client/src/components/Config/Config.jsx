import './Config.scss';
import React from 'react';

export default class Config extends React.Component {
  render() {
    return (
      <div className={'config'}>
        <h2 className="sub-header">Config</h2>
        {this.props.children}
      </div>
    );
  }
}
