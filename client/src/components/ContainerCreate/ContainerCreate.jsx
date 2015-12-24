import './ContainerCreate.scss';
import React from 'react';
import ContainerCreateForm from '../ContainerCreateForm/ContainerCreateForm';

export default class ContainerCreate extends React.Component {

  state = {}

  render() {
    return (
      <div className={'container-creae'}>
        <h1>
          Create container
        </h1>
        <ContainerCreateForm className={'form-horizontal'} />
      </div>
    );
  }
}
