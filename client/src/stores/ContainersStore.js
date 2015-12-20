import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  CONTAINERS__UPDATED,
  CONTAINERS__GET_SUCCESS
} from '../constants/AppConstants';

var token = null;

class ContainerStore extends BaseStore {

  emitChange() {
    this.emit(CONTAINERS__UPDATED);
  }

  addChangeListener(callback) {
    this.on(CONTAINERS__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CONTAINERS__UPDATED, callback);
  }
}

let store = new ContainerStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case CONTAINERS__GET_SUCCESS:
      store.setAll(action.containers);
      break;
    default:
  }
});

export default store;
