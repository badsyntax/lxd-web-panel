import './containers.scss';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Containers extends React.Component {
  render() {
    return (
      <div className={'containers-container container'}>
        <h1>LXD Web Panel - API Browser</h1>
        <Button>Generate token (authenticate)</Button>
        <Button>Get LXD Apis</Button>
        <Button>Get Server Info</Button>
        <Button>Get containers</Button>
        <Button>Updates a container config</Button>
        <Button>Rename a container</Button>
        <Button>Get container information</Button>
        <Button>Create a container</Button>
      </div>
    );
  }
}
