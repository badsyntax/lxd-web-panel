'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import RemoteImageModel from '../models/RemoteImageModel';

import {
  REMOTE_IMAGES__UPDATED,
  REMOTE_IMAGES__GET_SUCCESS
} from '../constants/AppConstants';

class RemoteImagesStore extends BaseStore {

  emitChange() {
    this.emit(REMOTE_IMAGES__UPDATED);
  }

  addChangeListener(callback) {
    this.on(REMOTE_IMAGES__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(REMOTE_IMAGES__UPDATED, callback);
  }

  set(image) {
    super.set(new RemoteImageModel(image));
  }

  setAll(images) {
    try {
      super.setAll(images.map((image) => new RemoteImageModel(image)));
    } catch(e) {
      alert(e);
    }
  }
}

let store = new RemoteImagesStore();

AppDispatcher.on(REMOTE_IMAGES__GET_SUCCESS, (action) => store.setAll(action.images));

export default store;
