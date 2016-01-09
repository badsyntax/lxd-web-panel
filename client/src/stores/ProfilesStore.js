import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProfileModel from '../../../models/Profile';

import {
  PROFILES__UPDATED,
  PROFILES__GET_SUCCESS
} from '../constants/AppConstants';

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
    super.set(new ProfileModel(profile));
  }

  setAll(profiles) {
    super.setAll(profiles.map((profile) => new ProfileModel(profile)));
  }
}

let store = new ProfilesStore();

AppDispatcher.on(PROFILES__GET_SUCCESS, (action) => store.setAll(action.profiles));

export default store;
