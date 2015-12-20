import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  AUTH_STORE__UPDATED,
  AUTH_STORE__GET_SUCCESS
} from '../constants/AppConstants';

var token = null;

class AuthStore extends BaseStore {

  emitChange() {
    this.emit(AUTH_STORE__UPDATED);
  }

  addChangeListener(callback) {
    this.on(AUTH_STORE__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(AUTH_STORE__UPDATED, callback);
  }

  getToken() {
    return token;
  }

  setToken(newToken) {
    token = newToken;
    console.log('set token');
  }

  clearToken() {
    token = null;
  }

  loggedIn() {
    console.log('is logged in');
    return Boolean(this.getToken());
  }
}

let store = new AuthStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case AUTH_STORE__GET_SUCCESS:
      store.setAll(action.items);
      break;
    default:
  }
});

export default store;
