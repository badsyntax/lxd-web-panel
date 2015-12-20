'use strict';

import './ContainerCreate.scss';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';

export default class ContainerCreate extends React.Component {

  state = {
    containers: []
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={'container-creae'}>
        <h1>
          Create container
        </h1>
      </div>
    );
  }
}
