import './ContainerCreateForm.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router';
import WebAPI from '../../util/WebAPI';
import ProfilesStore from '../../stores/ProfilesStore';
import ImagesStore from '../../stores/ImagesStore';
import AppActions from '../../actions/AppActions';
import ContainerCreateFieldset from './ContainerCreateFieldset';

import {
  ContainerModel,
  ImageModel
} from '../../models';

export default class ContainerCreateForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  state = getInitialState()

  componentDidMount() {

    ProfilesStore.addChangeListener(this.onStoreChange);
    ImagesStore.addChangeListener(this.onStoreChange);

    AppActions.getProfiles();
    AppActions.getImages();
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onStoreChange);
    ImagesStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    this.setState({
      profiles: ProfilesStore.getAll(),
      images: ImagesStore.getAll()
    });
  }

  onSubmit = (e) => {
    this.props.onSubmit(e, this.state.formModel);
  }

  render() {
    return (
      <Form
        className={'container-create-form'}
        formModel={this.state.formModel}
        onSubmit={this.onSubmit}
      >
        <ContainerCreateFieldset
          profiles={this.state.profiles}
          images={this.state.images}
          disabled={this.props.disabled}
        />
      </Form>
    )
  }
}
