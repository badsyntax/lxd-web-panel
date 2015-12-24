import React, { PropTypes } from 'react';

import Field from '../Field/Field';
import Select from '../Select/Select';
import ContainerCreateProfilesFieldset from './ContainerCreateProfilesFieldset';

export default class ContainerCreateFieldset extends React.Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    profiles: PropTypes.array.isRequired
  };

  static contextTypes = {
    formModel: React.PropTypes.object.isRequired
  }

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
          placeholder="Name"
        />
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          Input={Select}
          options={this.props.images}
          name="image"
          label="Image"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
        />
        <ContainerCreateProfilesFieldset profiles={this.props.profiles} />
      </fieldset>
    );
  }
}
