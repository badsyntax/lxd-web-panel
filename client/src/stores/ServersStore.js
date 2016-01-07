
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

  set(image) {
    super.set(new ServerModel(image));
  }

  setAll(images) {
    super.setAll(images.map((image) => new ServerModel(image)));
  }
}

let store = new ServersStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case SERVERS__GET_SUCCESS:
      store.setAll(action.images);
      break;
    default:
  }
});

export default store;
