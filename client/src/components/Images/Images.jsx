import './Images.scss';
import React from 'react';
import { Link } from 'react-router';

export default class Images extends React.Component {
  render() {
    return (
      <div className={'images'}>
        {this.props.children}
      </div>
    );
  }
}
