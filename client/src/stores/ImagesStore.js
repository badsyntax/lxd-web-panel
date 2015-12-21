import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ImageModel } from '../models';

import {
  IMAGES__UPDATED,
  IMAGES__GET_SUCCESS
} from '../constants/AppConstants';

var token = null;

class ImagesStore extends BaseStore {

  emitChange() {
    console.log('images store updated');
    this.emit(IMAGES__UPDATED);
  }

  addChangeListener(callback) {
    this.on(IMAGES__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(IMAGES__UPDATED, callback);
  }

  set(image) {
    return super.set(new ImageModel(image));
  }

  setAll(images) {
    console.log('image set all');
    return super.setAll(images.map((image) => new ImageModel(image)));
  }
}

let store = new ImagesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case IMAGES__GET_SUCCESS:
      console.log('SETTINGS IMAGES', action.images);
      store.setAll(action.images);
      break;
    default:
  }
});

export default store;
