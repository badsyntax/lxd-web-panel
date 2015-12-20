'use strict';

import './ProfilesList.scss';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';

export default class Profiles extends React.Component {

  state = {
    profiles: []
  }

  componentDidMount() {
    WebAPI.getProfiles()
    .then(function(response) {
      if (response.profiles) {
        console.log('GOT PROFILES', response.profiles);
        this.setState({
          profiles: response.profiles
        });
      }
    }.bind(this));
  }
  render() {
    return (
      <div className={'profiles'}>
        <h1>
          Profiles
          <Link to={'profiles/create'} className={'btn btn-default btn-new-profile'}>
            New profile
          </Link>
        </h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.profiles.map((profile, index) => {
                return (
                  <tr key={'profile-' + index}>
                    <td>{ profile.name }</td>
                    <td>
                      <button className="btn btn-default btn-xs">Edit</button>
                      <button className="btn btn-default btn-xs">Delete</button>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
