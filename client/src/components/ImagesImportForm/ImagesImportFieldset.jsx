import React, { PropTypes } from 'react';

import Field from '../Field/Field';
import Select from '../Select/Select';

export default class ImagesImportFieldset extends React.Component {

  static propTypes = {
    remoteImages: PropTypes.array.isRequired,
    onImageChange: PropTypes.func.isRequired
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
          Input={Select}
          options={this.props.remoteImages}
          name="remoteAlias"
          label="Image"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          showError={this.props.showErrors}
          onChange={this.props.onImageChange}
        />
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          name="localAlias"
          label="Alias"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          placeholder="Name"
          showError={this.props.showErrors}
        />
        <Field
          className="form-group"
          disabled={this.props.disabled}
          horizontal={true}
          name="description"
          label="Description"
          labelLayoutClassName="col-sm-2"
          inputLayoutClassName="col-sm-5"
          placeholder="Description"
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
