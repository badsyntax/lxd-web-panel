import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  PROFILES__UPDATED,
  PROFILES__GET_SUCCESS
} from '../constants/AppConstants';

var token = null;

class ProfilesStore extends BaseStore {

  emitChange() {
    this.emit(PROFILES__UPDATED);
  }

  addChangeListener(callback) {
    this.on(PROFILES__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(PROFILES__UPDATED, callback);
  }
}

let store = new ProfilesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case PROFILES__GET_SUCCESS:
      store.setAll(action.profiles);
      break;
    default:
  }
});

export default store;
