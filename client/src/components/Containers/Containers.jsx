import './containers.scss';
import React from 'react';
import { Link } from 'react-router';

export default class Containers extends React.Component {
  render() {
    return (
      <div className={'containers'}>
        {this.props.children}
      </div>
    );
  }
}
