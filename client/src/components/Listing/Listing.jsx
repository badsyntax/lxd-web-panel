import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Listing extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>LXD Web Panel - API Browser</h1>
        <Button>Get LXD Apis</Button>
        <Button>Get Server Info</Button>
        <Button>Get containers</Button>
      </div>
    );
  }
}
