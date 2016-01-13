'use strict';

import BaseContainerModel from '../../../models/Container';

export default class ContainerModel extends BaseContainerModel {

    get name() {
      return this._name;
    }

    set name(name) {
      this._name = name;
    }
}
