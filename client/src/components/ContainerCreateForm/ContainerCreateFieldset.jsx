import React, { PropTypes } from 'react';

import Field from '../Field/Field';
import InputHorizontal from '../InputHorizontal/InputHorizontal';
import ContainerCreateProfilesFieldset from './ContainerCreateProfilesFieldset';

export default class ContainerCreateFieldset extends React.Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    profiles: PropTypes.array.isRequired
  };

  render() {


    let hasImage = (image) => {
      return false;
      return (
        this.state.container.image.alias === image.alias
      );
    }
    return (
      <fieldset>
        <div className="form-group">
          <Field
            autoFocus
            disabled={this.props.disabled}
            Input={InputHorizontal}
            name="name"
            label="Name"
            wrapperClassName="col-sm-5"
            labelClassName="col-sm-2"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label
            className="col-sm-2 control-label"
            htmlFor="inputImage"
          >
            Image
          </label>
          <div className="col-sm-5">
            <select
              className="form-control"
              id="inputImage"
              placeholder="Default image"
              ref={'name'}
            >
              <option>Please select...</option>
              { this.props.images.map((image, i) => {
                return (
                  <option
                    key={'image-' + i}
                    selected={hasImage(image)}
                    value={image.alias}
                  >
                    {image.alias}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <ContainerCreateProfilesFieldset profiles={this.props.profiles} />
      </fieldset>
    );
  }
}
