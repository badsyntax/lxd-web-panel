import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  IMAGES__UPDATED,
  IMAGES__GET_SUCCESS
} from '../constants/AppConstants';

var token = null;

class ProfilesStore extends BaseStore {

  emitChange() {
    this.emit(IMAGES__UPDATED);
  }

  addChangeListener(callback) {
    this.on(IMAGES__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(IMAGES__UPDATED, callback);
  }
}

let store = new ProfilesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case IMAGES__GET_SUCCESS:
      store.setAll(action.images);
      break;
    default:
  }
});

export default store;
