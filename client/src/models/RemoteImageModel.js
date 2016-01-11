'use strict';

import AppActions from '../actions/AppActions';
import BaseRemoteImageModel from '../../../models/RemoteImage';

export default class RemoteImageModel extends BaseRemoteImageModel {

  get value() {
    return this.get('alias');
  };

  get label() {
    return this.get('description');
  };

  set value(val) {};
  set label(val) {};

  delete() {
    AppActions.deleteImage(this);
  }
}
