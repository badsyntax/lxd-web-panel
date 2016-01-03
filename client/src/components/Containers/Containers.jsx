import './containers.scss';
import React from 'react';

export default class Containers extends React.Component {
  render() {
    return (
      <div className={'containers'}>
        {this.props.children}
      </div>
    );
  }
}
