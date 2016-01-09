'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ServerModel from '../models/ServerModel';

import {
  SERVERS__UPDATED,
  SERVERS__GET_SUCCESS
} from '../constants/AppConstants';

class ServersStore extends BaseStore {

  emitChange() {
    this.emit(SERVERS__UPDATED);
  }

  addChangeListener(callback) {
    this.on(SERVERS__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(SERVERS__UPDATED, callback);
  }

  set(server) {
    super.set(new ServerModel(server));
  }

  setAll(servers) {
    super.setAll(servers.map((server) => new ServerModel(server)));
  }
}

let store = new ServersStore();

AppDispatcher.on(SERVERS__GET_SUCCESS, (action) => store.setAll(action.servers));

export default store;
