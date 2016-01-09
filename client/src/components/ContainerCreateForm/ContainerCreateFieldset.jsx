'use strict';

import React, { PropTypes } from 'react';

import Field from '../Field/Field';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import Select from '../Select/Select';

export default class ContainerCreateFieldset extends React.Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    profiles: PropTypes.array.isRequired
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
          inputLayoutClassName="col-sm-5"
          label="Name"
          labelLayoutClassName="col-sm-2"
          name="name"
          placeholder="Name"
          showError={this.props.showErrors}
        />
        <Field
          Input={Select}
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          inputLayoutClassName="col-sm-5"
          label="Image"
          labelLayoutClassName="col-sm-2"
          name="image"
          options={this.props.images}
          showError={this.props.showErrors}
        />
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          Input={CheckboxGroup}
          inputLayoutClassName="col-sm-5"
          label="Profiles"
          labelLayoutClassName="col-sm-2"
          name="profiles"
          options={this.props.profiles}
          showError={this.props.showErrors}
        />
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-2">
            <button
              className="btn btn-med btn-primary btn-block"
              type="submit"
            >Submit</button>
          </div>
        </div>
      </fieldset>
    );
  }
}
