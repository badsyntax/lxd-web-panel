'use strict';

import BaseServerModel from '../../../models/Server';

export default class ServerModel extends BaseServerModel {

  get value() {
    return this.get('name');
  }

  get label() {
    return this.get('name') + ' (' + this.get('url') + ')';
  }
}
