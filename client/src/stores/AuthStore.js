'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {
  AUTH__STORE_UPDATED,
  AUTHENTICATE__SUCCESS
} from '../constants/AppConstants';

var token = null;

class AuthStore extends BaseStore {

  emitChange() {
    this.emit(AUTH__STORE_UPDATED);
  }

  addChangeListener(callback) {
    this.on(AUTH__STORE_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(AUTH__STORE_UPDATED, callback);
  }

  getToken() {
    return token;
  }

  setToken(newToken) {
    token = newToken;
  }

  clearToken() {
    token = null;
  }

  loggedIn() {
    return Boolean(this.getToken());
  }
}

let store = new AuthStore();

AppDispatcher.on(AUTHENTICATE__SUCCESS, (action) => store.setToken(action.token));

export default store;
