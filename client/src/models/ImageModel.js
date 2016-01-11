'use strict';

import AppActions from '../actions/AppActions';
import BaseImageModel from '../../../models/Image';

export default class ImageModel extends BaseImageModel {

  delete() {
    AppActions.deleteImage(this);
  }

  get friendlyAliases() {
    return this.aliases.map(function(alias) {
      return alias.target;
    }).join(', ');
  }
}
