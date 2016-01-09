'use strict';

import React, { PropTypes } from 'react';

import Field from '../Field/Field';
import Select from '../Select/Select';

import { DEFAULT_SERVER_URL } from '../../constants/AppConstants';

export default class ServersAddFieldset extends React.Component {

  static propTypes = {
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <fieldset>
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          name="name"
          label="Name"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          placeholder="images"
          showError={this.props.showErrors}
        />
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          name="url"
          label="URL"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          placeholder={DEFAULT_SERVER_URL}
          showError={this.props.showErrors}
        />
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-2">
            <button type="submit" className="btn btn-med btn-primary btn-block">Submit</button>
          </div>
        </div>
      </fieldset>
    );
  }
}
