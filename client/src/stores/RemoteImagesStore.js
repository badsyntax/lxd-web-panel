import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ImageModel } from '../models';

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
}

let store = new RemoteImagesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case REMOTE_IMAGES__GET_SUCCESS:
      store.setAll(action.images);
      break;
    default:
  }
});

export default store;
