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

import ContainerModel from '../../models/Container';
import ImageModel from '../../models/Image';

import Form from '../Form/Form';

export default class ContainerCreateForm extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onSubmit: PropTypes.func
  };

  constructor(...props) {
    super(...props);

    var initialData = {
      name: 'foobar',
      profiles: [],
      image: {}
    };

    var formModel = new ContainerModel(initialData, null, this.onFormModelChange);
    formModel.setRequired('profiles', true);
    formModel.setRequired('name', true);
    formModel.setRequired('image', true);

    this.state = {
      profiles: ProfilesStore.getAll(),
      images: ImagesStore.getAll(),
      formModel
    };
  }

  componentDidMount() {

    ProfilesStore.addChangeListener(this.onProfilesStoreChange);
    ImagesStore.addChangeListener(this.onImagesStoreChange);

    AppActions.getProfiles();
    AppActions.getImages();
  }

  componentWillUnmount() {
    ProfilesStore.removeChangeListener(this.onProfilesStoreChange);
    ImagesStore.removeChangeListener(this.onImagesStoreChange);
  }

  onFormModelChange = (formModel) => {
    this.setState({
      formModel: formModel
    });
  }

  onProfilesStoreChange = () => {
    var profiles = ProfilesStore.getAll();

    // An example of having a model with profiles
    var formModel = this.state.formModel;
    formModel.update('profiles', [ profiles[0] ])

    this.setState({
      profiles,
      formModel
    });
  }

  onImagesStoreChange = () => {
    this.setState({
      images: ImagesStore.getAll()
    });
  }

  onSubmit = (e) => {
    this.props.onSubmit(e, this.state.formModel);
  }

  render() {
    return (
      <Form
        className={'container-create-form form-horizontal'}
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
