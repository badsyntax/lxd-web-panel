'use strict';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ImageModel from '../models/ImageModel';

import {
  IMAGES__UPDATED,
  IMAGES__GET_SUCCESS
} from '../constants/AppConstants';

class ImagesStore extends BaseStore {

  emitChange() {
    this.emit(IMAGES__UPDATED);
  }

  addChangeListener(callback) {
    this.on(IMAGES__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(IMAGES__UPDATED, callback);
  }

  set(image) {
    super.set(new ImageModel(image));
  }

  setAll(images) {
    super.setAll(images.map((image) => new ImageModel(image)));
  }
}

let store = new ImagesStore();

AppDispatcher.on(IMAGES__GET_SUCCESS, (action) => store.setAll(action.images));

export default store;
