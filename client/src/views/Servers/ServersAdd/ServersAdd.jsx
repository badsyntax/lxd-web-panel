'use strict';

import './ServersAdd.scss';
import React from 'react';

import ServersAddForm from '../../../components/ServersAddForm/ServersAddForm';

import {
  IMAGES__GET_END
} from '../../../constants/AppConstants';

export default class ServersAdd extends React.Component {

  constructor(...props) {
    super(...props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={'servers-add'}>
        <h2 className="sub-header">
          Add server
        </h2>
        <ServersAddForm
            className={'form form-horizontal'} />
      </div>
    );
  }
}
