'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import RemoteImageModel from '../models/RemoteImageModel';

import {
  REMOTE_SERVERS__UPDATED,
  REMOTE_SERVERS__GET_SUCCESS
} from '../constants/AppConstants';

class RemoteImagesStore extends BaseStore {

  emitChange() {
    this.emit(REMOTE_SERVERS__UPDATED);
  }

  addChangeListener(callback) {
    this.on(REMOTE_SERVERS__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(REMOTE_SERVERS__UPDATED, callback);
  }

  set(image) {
    super.set(new RemoteImageModel(image));
  }

  setAll(images) {
    super.setAll(images.map((image) => new RemoteImageModel(image)));
  }
}

let store = new RemoteImagesStore();

AppDispatcher.on(REMOTE_SERVERS__GET_SUCCESS, (action) => store.setAll(action.images));

export default store;
