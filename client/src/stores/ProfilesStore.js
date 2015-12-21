import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ProfileModel} from '../models';

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

  set(profile) {
    return super.set(new ProfileModel(profile));
  }

  setAll(profiles) {
    return super.setAll(profiles.map((profile) => new ProfileModel(profile)));
  }
}

let store = new ProfilesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
  case PROFILES__GET_SUCCESS:
    store.setAll(action.profiles);
    console.log(store);
    break;
  default:
    break;
  }
});

export default store;
